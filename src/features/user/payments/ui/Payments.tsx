'use client'
import GlobalLoader from '@/entities/loading/loading'
import { useGetPaymentsByUserQuery } from '@/shared/graphql'
import { Pagination } from '@/shared/ui/pagination'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'
import s from './Payments.module.scss'
import { PaymentsTable } from './PaymentsTable'

const PAGE_SIZE = 10
const PAGE_NUMBER = 1

type Props = {
  userId: string
}

export const Payments = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER)
  const { data, loading, error } = useGetPaymentsByUserQuery({
    variables: { userId: +userId, pageSize, pageNumber },
  })

  if (loading && !data) {
    return <GlobalLoader />
  }

  if (error) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetPaymentsByUser')}</div>
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPageNumber(1)
  }

  const payments = data?.getPaymentsByUser.items || []
  const pagination = data?.getPaymentsByUser || ''

  return (
    <>
      {payments?.length > 0 ? (
        <PaymentsTable payments={payments} />
      ) : (
        <div className={s.emptyContent}>{t('noPayments')}</div>
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
