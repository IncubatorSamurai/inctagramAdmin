import { useEffect, useRef, useMemo, useCallback } from 'react'
import { useGetAllPostsLazyQuery } from '../graphql/getPosts.generated'
import { useGetNewPostsSubscription } from '../graphql/subscriptionPosts.generated'
import { useSearch } from './useSearch'
import { useDebounce } from './useDebounce'
import { Reference, StoreObject, useApolloClient } from '@apollo/client'

import { NetworkStatus } from '@apollo/client'

export const useGetPostsSubscription = () => {
  const { searchTerm, setSearchTerm } = useSearch()
  const debouncedSearchTerm = useDebounce(searchTerm, 1500)
  const client = useApolloClient()
  const endCursorPostId = useRef<number | null>(null)
  const lastRequestParams = useRef<{ endCursorPostId: number | null; searchTerm: string } | null>(
    null
  )
  const hasMorePosts = useRef(true)

  const [fetchPosts, { data: lazyData, loading, networkStatus, error, fetchMore }] =
    useGetAllPostsLazyQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    })

  useEffect(() => {
    endCursorPostId.current = null
    hasMorePosts.current = true
    lastRequestParams.current = null
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (!lazyData || debouncedSearchTerm !== lastRequestParams.current?.searchTerm) {
      const params = {
        endCursorPostId: 0,
        searchTerm: debouncedSearchTerm,
      }
      lastRequestParams.current = params
      fetchPosts({
        variables: params,
      }).then(({ data }) => {
        hasMorePosts.current = (data?.getPosts.items?.length || 0) > 0
      })
    }
  }, [debouncedSearchTerm])

  useGetNewPostsSubscription({
    skip: !!debouncedSearchTerm,
    onData: ({ data: subscriptionData }) => {
      const newPost = subscriptionData?.data?.postAdded
      if (newPost) {
        client.cache.modify({
          fields: {
            getPosts(existingPostsRefs = {}, { readField }) {
              const items = (readField('items', existingPostsRefs) || []) as (
                | StoreObject
                | Reference
              )[]

              const ids = items.map(ref => readField('id', ref))

              if (ids.includes(newPost.id)) return existingPostsRefs
              return {
                ...existingPostsRefs,
                items: [newPost, ...items],
              }
            },
          },
        })
      }
    },
  })

  const posts = lazyData?.getPosts.items || []

  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || loading || !hasMorePosts.current) return

      const currentEndCursor = posts[posts.length - 1]?.id
      const currentParams = {
        endCursorPostId: currentEndCursor,
        searchTerm: debouncedSearchTerm,
      }

      if (
        lastRequestParams.current &&
        lastRequestParams.current.endCursorPostId === currentParams.endCursorPostId &&
        lastRequestParams.current.searchTerm === currentParams.searchTerm
      ) {
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            lastRequestParams.current = currentParams

            fetchMore({
              variables: currentParams,
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  hasMorePosts.current = false
                  return prev
                }

                const newItems = fetchMoreResult.getPosts.items.filter(
                  item => !prev.getPosts.items.some(p => p.id === item.id)
                )

                if (newItems.length === 0) {
                  hasMorePosts.current = false
                }

                return {
                  getPosts: {
                    ...fetchMoreResult.getPosts,
                    items: [...prev.getPosts.items, ...newItems],
                  },
                }
              },
            }).catch(() => {
              hasMorePosts.current = false
            })
          }
        },
        { threshold: 0.25 }
      )

      observer.observe(node)
      return () => observer.disconnect()
    },
    [loading, posts, debouncedSearchTerm]
  )

  return useMemo(
    () => ({
      posts,
      loading: loading || networkStatus === NetworkStatus.fetchMore,
      error,
      setSearchTerm,
      searchTerm,
      lastPostElementRef,
      hasMorePosts: hasMorePosts.current,
    }),
    [posts, loading, networkStatus, error, searchTerm]
  )
}
