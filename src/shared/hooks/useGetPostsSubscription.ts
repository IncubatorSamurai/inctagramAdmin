import { useEffect, useState } from 'react'
import { GetAllPostsQuery, useGetAllPostsLazyQuery } from '../graphql/getPosts.generated'
import { useGetNewPostsSubscription } from '../graphql/subscriptionPosts.generated'
import { useSearch } from './useSearch'
import { useDebounce } from './useDebounce'
import { useInView } from 'react-intersection-observer'

type PostItem = GetAllPostsQuery['getPosts']['items'][number]

export const useNormalizedPosts = () => {
  const [lastPostIdForNewPosts, setLastPostIdForNewPosts] = useState(0)
  const { searchTerm, setSearchTerm } = useSearch()
  const debouncedSearchTerm = useDebounce(searchTerm, 1500)

  const [fetchPosts, { data, loading, error }] = useGetAllPostsLazyQuery()

  const { data: subscriptionData } = useGetNewPostsSubscription({
    skip: !!debouncedSearchTerm,
  })

  const postsFromServer = data?.getPosts.items ?? []

  const [posts, setPosts] = useState<PostItem[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const { ref: lastPostRef, inView } = useInView({ threshold: 0.25 })

  useEffect(() => {
    setPosts([])
    setLastPostIdForNewPosts(0)
    setIsInitialLoad(true)
    fetchPosts({
      variables: {
        endCursorPostId: 0,
        searchTerm: debouncedSearchTerm,
      },
    })
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (postsFromServer.length) {
      setPosts(prev => (isInitialLoad ? postsFromServer : [...prev, ...postsFromServer]))
      setIsInitialLoad(false)
    }
  }, [postsFromServer])

  useEffect(() => {
    const newPost = subscriptionData?.postAdded
    if (newPost && !debouncedSearchTerm) {
      setPosts(prev => {
        const exists = prev.find(p => p.id === newPost.id)
        return exists ? prev : [newPost, ...prev]
      })
    }
  }, [subscriptionData, debouncedSearchTerm])

  useEffect(() => {
    if (inView && !loading && lastPostIdForNewPosts !== 0 && posts.length > 0) {
      fetchPosts({
        variables: {
          endCursorPostId: lastPostIdForNewPosts,
          searchTerm: debouncedSearchTerm,
        },
      })
    }
  }, [inView, loading])

  useEffect(() => {
    if (posts.length) {
      setLastPostIdForNewPosts(posts[posts.length - 1].id)
    }
  }, [posts])

  const uniquePosts = Array.from(new Map(posts.map(post => [post.id, post])).values())

  return {
    posts: uniquePosts,
    loading,
    error,
    setSearchTerm,
    searchTerm,
    lastPostRef,
  }
}
