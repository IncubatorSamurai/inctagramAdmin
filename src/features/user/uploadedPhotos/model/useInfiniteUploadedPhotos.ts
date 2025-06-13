import { useGetPostsByUserLazyQuery } from '@/shared/graphql'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useInfiniteUploadedPhotos = ({ userId }: { userId: number }) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const [fetchPostsByUser, { data, loading, error, fetchMore }] = useGetPostsByUserLazyQuery()
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  useEffect(() => {
    if (!userId) return

    setIsInitialLoading(true)
    fetchPostsByUser({
      variables: { userId },
    }).finally(() => setIsInitialLoading(false))
  }, [userId, fetchPostsByUser])

  useEffect(() => {
    return () => {
      observer.current?.disconnect()
    }
  }, [])

  const uploadedPhotos = data?.getPostsByUser.items || []

  const fetchNextUploadedPhotos = async () => {
    if (!uploadedPhotos?.length) return

    setIsFetchingMore(true)

    try {
      await fetchMore({
        variables: {
          userId,
          endCursorId: uploadedPhotos[uploadedPhotos.length - 1].id,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          const prevItems = previousResult.getPostsByUser.items || []
          const newItems = fetchMoreResult.getPostsByUser.items || []

          const existingIds = new Set(prevItems.map(item => item.id))
          const filteredNewItems = newItems?.filter(item => !existingIds.has(item.id))

          return {
            getPostsByUser: {
              ...fetchMoreResult.getPostsByUser,
              items: [...prevItems, ...filteredNewItems],
            },
          }
        },
      })
    } catch (error) {
      console.error('Error fetching more photos:', error)
    } finally {
      setIsFetchingMore(false)
    }
  }

  const setLastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || isFetchingMore) return

      observer.current?.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && uploadedPhotos.length > 0) {
            console.log(uploadedPhotos)

            fetchNextUploadedPhotos()
          }
        },
        { rootMargin: '200px' }
      )

      if (node) observer.current.observe(node)
    },
    [loading, uploadedPhotos.length]
  )

  return {
    photos: uploadedPhotos,
    isFetchingMore: isFetchingMore,
    error,
    setLastElementRef,
    isInitialLoading,
  }
}
