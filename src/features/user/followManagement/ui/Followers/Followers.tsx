'use client'
import GlobalLoader from '@/entities/loading/loading'
import { useGetFollowersQuery } from '@/shared/graphql'
import { useSortAndPagination } from '@/shared/hooks'
import { Pagination } from '@/shared/ui/pagination'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { FollowTable } from '../FollowTable'
import s from './Followers.module.scss'

type Props = {
  userId: string
}

export const Followers = ({ userId }: Props) => {
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

  const { data, loading, error } = useGetFollowersQuery({
    variables: { userId: +userId, pageSize, pageNumber, sortBy: sortField, sortDirection },
  })

  if (loading && !data) {
    return <GlobalLoader />
  }

  if (error) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetFollow')}</div>
  }

  const followers = data?.getFollowers.items || []
  const pagination = data?.getFollowers || ''
  const hasItems = followers?.length > 0

  return (
    <>
      {hasItems ? (
        <FollowTable
          follow={followers}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      ) : (
        <div className={s.emptyContent}>{t('noData')}</div>
      )}

      {pagination && pagination.totalCount > 0 && (
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
