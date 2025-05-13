'use client'

import s from './PaymentsData.module.scss'
import { Input } from '@/shared/ui/input'
import { Pagination } from '@/shared/ui/pagination'
import { useEffect, useState } from 'react'
import { PaymentsListTable } from '@/features/paymentsList/PaymentsListTable/PaymentsListTable'
import { useGetPaymentsQuery } from '@/shared/graphql'
import { useSortAndPagination } from '@/shared/hooks'
import { useTranslations } from 'next-intl'

export const PaymentsData = () => {
  const [searchUser, setSearchUser] = useState('')
  const {
    pageSize,
    pageNumber,
    sortField,
    sortDirection,
    setPageNumber,
    handleSortChange,
    handlePageSizeChange,
  } = useSortAndPagination()

  const [debouncedValue, setDebouncedValue] = useState(searchUser)

  const { data } = useGetPaymentsQuery({
    variables: {
      pageSize,
      pageNumber,
      sortBy: sortField,
      searchTerm: debouncedValue,
      sortDirection,
    },
  })

  const pagination = data?.getPayments
  const payments = data?.getPayments.items ?? []

  useEffect(() => {
    const handlerTimeOut = setTimeout(() => {
      setDebouncedValue(searchUser)
    }, 500)

    return () => {
      clearTimeout(handlerTimeOut)
    }
  }, [searchUser])

  const t = useTranslations('search')
  return (
    <section className={s.usersList}>
      <div className={s.userList_header}>
        <div className={s.userList_header_search}>
          <Input
            type="search"
            placeholder={t('search')}
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
          />
        </div>
      </div>
      <PaymentsListTable
        payments={payments}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      {pagination && (
        <Pagination
          changeCurrentPage={setPageNumber}
          changeItemsPerPage={handlePageSizeChange}
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </section>
  )
}
