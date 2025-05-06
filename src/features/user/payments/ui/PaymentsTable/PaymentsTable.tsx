import { SubscriptionByPaymentModel } from '@/shared/graphql/types'
import { Root, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared/ui/table'
import { parseIsoDate } from '@/shared/utils'
import { useTranslations } from 'next-intl'

type Props = {
  payments: SubscriptionByPaymentModel[]
}

export const PaymentsTable = ({ payments }: Props) => {
  const t = useTranslations('userProfile')

  const SubscriptionType = {
    MONTHLY: t('month'),
    DAY: t('1day'),
    WEEKLY: t('7day'),
  } as const

  return (
    <Root>
      <TableHead>
        <TableRow>
          <TableHeadCell>{t('dateOfPayment')}</TableHeadCell>
          <TableHeadCell>{t('endDateOfSubscription')}</TableHeadCell>
          <TableHeadCell>{t('amount')}</TableHeadCell>
          <TableHeadCell>{t('subscriptionType')}</TableHeadCell>
          <TableHeadCell>{t('paymentType')}</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map(payment => (
          <TableRow key={payment.id}>
            <TableCell>{parseIsoDate(payment.dateOfPayment)}</TableCell>
            <TableCell>{parseIsoDate(payment.endDate)}</TableCell>
            <TableCell>{`$${payment.price}`}</TableCell>
            <TableCell>{SubscriptionType[payment.type]}</TableCell>
            <TableCell>{payment.paymentType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  )
}
