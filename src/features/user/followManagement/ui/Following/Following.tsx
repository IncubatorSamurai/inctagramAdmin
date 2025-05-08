'use client'
import GlobalLoader from '@/entities/loading/loading'
import { useGetFollowingQuery } from '@/shared/graphql'
import { useSortAndPagination } from '@/shared/hooks'
import { Pagination } from '@/shared/ui/pagination'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { FollowTable } from '../FollowTable'
import s from './Following.module.scss'

type Props = {
  userId: string
}

export const Following = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const {
    pageSize,
    pageNumber,
    sortField,
    sortDirection,
    setPageNumber,
    handleSortChange,
    handlePageSizeChange,
  } = useSortAndPagination()

  const { data, loading, error } = useGetFollowingQuery({
    variables: { userId: +userId, pageSize, pageNumber, sortBy: sortField, sortDirection },
  })

  if (loading && !data) {
    return <GlobalLoader />
  }

  if (error) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetFollow')}</div>
  }

  const following = data?.getFollowing.items || []
  const pagination = data?.getFollowing || ''
  const hasItems = following?.length > 0

  return (
    <>
      {hasItems ? (
        <FollowTable
          follow={following}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      ) : (
        <div className={s.emptyContent}>{t('noData')}</div>
      )}

      {pagination && (
        <Pagination
          changeCurrentPage={setPageNumber}
          changeItemsPerPage={handlePageSizeChange}
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </>
  )
}
