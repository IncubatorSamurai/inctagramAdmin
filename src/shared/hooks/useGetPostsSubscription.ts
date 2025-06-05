import { useEffect, useRef } from 'react'
import { useGetAllPostsQuery } from '../graphql/getPosts.generated'
import { useGetNewPostsSubscription } from '../graphql/subscriptionPosts.generated'
import { useSearch } from './useSearch'
import { useDebounce } from './useDebounce'
import { useInView } from 'react-intersection-observer'
import { useApolloClient } from '@apollo/client'

export const useNormalizedPosts = () => {
  const { searchTerm, setSearchTerm } = useSearch()
  const debouncedSearchTerm = useDebounce(searchTerm, 1500)
  const { ref: lastPostRef, inView } = useInView({ threshold: 0.25 })
  const client = useApolloClient()

  const { data, loading, error, fetchMore } = useGetAllPostsQuery({
    variables: {
      endCursorPostId: 0,
      searchTerm: debouncedSearchTerm,
    },
    notifyOnNetworkStatusChange: true,
  })

  useGetNewPostsSubscription({
    skip: !!debouncedSearchTerm,
    onData: ({ data: subscriptionData }) => {
      const newPost = subscriptionData?.data?.postAdded
      if (newPost) {
        client.cache.modify({
          fields: {
            getPosts(existing = { items: [] }) {
              const items = Array.isArray((existing as any)?.items) ? (existing as any).items : []
              if (items.some((p: any) => p.id === newPost.id)) return existing
              return {
                ...existing,
                items: [newPost, ...items],
              }
            },
          },
        })
      }
    },
  })

  const lastFetchedIdRef = useRef<number | null>(null)
  const isFetchingRef = useRef(false)
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (inView && !loading && data?.getPosts.items.length && !isFetchingRef.current) {
      const lastId = data?.getPosts.items[data.getPosts.items.length - 1].id

      if (lastFetchedIdRef.current === lastId) return

      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }

      fetchTimeoutRef.current = setTimeout(() => {
        isFetchingRef.current = true
        fetchMore({
          variables: {
            endCursorPostId: lastId,
            searchTerm: debouncedSearchTerm,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            isFetchingRef.current = false

            if (!fetchMoreResult) return prev

            return {
              getPosts: {
                ...fetchMoreResult.getPosts,
                items: [
                  ...prev.getPosts.items,
                  ...fetchMoreResult.getPosts.items.filter(
                    item => !prev.getPosts.items.some(p => p.id === item.id)
                  ),
                ],
              },
            }
          },
        }).catch(() => {
          isFetchingRef.current = false
        })
      }, 300)
    }

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [inView, loading, data, fetchMore, debouncedSearchTerm])

  return {
    posts: data?.getPosts.items ?? [],
    loading,
    error,
    setSearchTerm,
    searchTerm,
    lastPostRef,
  }
}
