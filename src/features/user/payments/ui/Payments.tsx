import GlobalLoader from '@/entities/loading/loading'
import { useGetPaymentsByUserQuery } from '@/shared/graphql/payments.generated'
import { Pagination } from '@/shared/ui/pagination'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'
import s from './Payments.module.scss'
import { PaymentsTable } from './PaymentsTable'

type Props = {
  userId: string
}

export const Payments = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const { data, loading, error } = useGetPaymentsByUserQuery({
    variables: { userId: +userId, pageSize, pageNumber },
  })

  if (loading && !data) {
    return <GlobalLoader />
  }

  if (error && !data) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetPaymentsByUser')}</div>
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
          changeItemsPerPage={value => {
            setPageSize(value)
            setPageNumber(1)
          }}
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </>
  )
}
