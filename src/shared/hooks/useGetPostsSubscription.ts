import { useEffect, useState } from 'react'
import { useGetAllPostsLazyQuery, useGetAllPostsQuery } from '../graphql/getPosts.generated'
import { useGetNewPostsSubscription } from '../graphql/subscriptionPosts.generated'
import { ImageModel, Post } from '../api/post/postApi.types'
import { useSearch } from './useSearch'
import { useDebounce } from './useDebounce'
import { useInView } from 'react-intersection-observer'

export const useNormalizedPosts = () => {
  const [lastPostIdForNewPosts, setLastPostIdForNewPosts] = useState(0)
  const { searchTerm, setSearchTerm } = useSearch()
  const debouncedSearchTerm = useDebounce(searchTerm, 1500)
  const { data, loading, error } = useGetAllPostsQuery({
    variables: {
      endCursorPostId: 0,
      searchTerm: debouncedSearchTerm,
    },
  })

const [fetchPosts, { data:lazyData}] = useGetAllPostsLazyQuery()
console.log(lazyData);


  const { data: subscriptionData } = useGetNewPostsSubscription()
  const postsFromServer = data?.getPosts.items ?? []

  const normalizePost = (item: any): Post => {
    if (!item || !item.id) {
      console.warn('Invalid post item:', item)
      return {
        id: 0,
        userName: '',
        description: '',
        location: '',
        images: [],
        createdAt: '',
        updatedAt: '',
        ownerId: 0,
        avatarOwner: '',
        owner: {
          id: 0,
          firstName: '',
          avatarUrl: '',
        },
        likesCount: 0,
        isLiked: false,
        avatarWhoLikes: false,
      }
    }

    return {
      id: item.id,
      userName: item.postOwner?.userName ?? '',
      description: item.description,
      location: '',
      images:
        item.images?.map((img: ImageModel) => ({
          url: img.url ?? '',
          width: 0,
          height: 0,
          fileSize: 0,
          createdAt: '',
          uploadId: '',
        })) ?? [],
      createdAt: item.createdAt,
      updatedAt: '',
      ownerId: item.id,
      avatarOwner: item.postOwner?.avatars?.[0]?.url ?? '',
      owner: {
        id: item.postOwner?.id,
        firstName: item.postOwner?.userName ?? '',
        avatarUrl: item.postOwner?.avatars?.[0]?.url ?? '',
      },
      likesCount: 0,
      isLiked: false,
      avatarWhoLikes: false,
    }
  }

  const [posts, setPosts] = useState<Post[]>([])

 const { ref: lastPostRef, inView } = useInView({
    threshold: 0, 
  })
 useEffect(() => {
    if (inView && !loading && lastPostIdForNewPosts !== 0) {
      setLastPostIdForNewPosts(lastPostIdForNewPosts)
      fetchPosts({
         variables: {
      endCursorPostId: lastPostIdForNewPosts,
      searchTerm: debouncedSearchTerm,
    },
      })
      console.log(lastPostIdForNewPosts)
    }
  }, [inView, loading, lastPostIdForNewPosts])

  //

const lastPost = posts[posts.length - 1];
// const lastPostId = lastPost ? lastPost.id : 0;
  useEffect(() => {
    if (lastPost) {
    setLastPostIdForNewPosts(lastPost.id);
  } else {
    setLastPostIdForNewPosts(0);
  }
  }, [posts])

  useEffect(() => {
    if (postsFromServer.length) {
      const normalized = postsFromServer.map(normalizePost)
      setPosts(normalized)
    }
  }, [postsFromServer])

  useEffect(() => {
    const newPost = subscriptionData?.postAdded
    console.log(newPost)

    if (newPost) {
      const normalizedNewPost = normalizePost(newPost)
      setPosts(prev => [normalizedNewPost, ...prev])
    }
  }, [subscriptionData])

  return { posts, loading, error, setSearchTerm, searchTerm , lastPostRef }
}
