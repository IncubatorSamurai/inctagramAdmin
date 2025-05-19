import s from './PaymentsListTable.module.scss'
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow, Root } from '@/shared/ui/table'
import { SortControl } from '@/shared/ui/sort-control'
import { SortableField, SortProps } from '@/shared/types'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { SubscriptionPaymentsModel } from '@/shared/graphql'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { useTranslations } from 'next-intl'
import { parseIsoDate } from '@/shared/utils'

export type Props = {
  payments: SubscriptionPaymentsModel[]
} & SortProps
export const PaymentsListTable = ({ payments, onSortChange, sortField, sortDirection }: Props) => {
  const t = useTranslations('payments')
  return (
    <Root className={s.userTable} classNameContainer={s.containerUserTable}>
      <TableHead>
        <TableRow>
          <TableHeadCell className={s.filterCell}>
            <SortControl
              direction={sortField === SortableField.USERNAME ? sortDirection : null}
              onClick={() => onSortChange(SortableField.USERNAME)}
            >
              {t('userName')}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell className={s.filterCell}>
            <SortControl
              direction={sortField === SortableField.CREATED_AT ? sortDirection : null}
              onClick={() => onSortChange(SortableField.CREATED_AT)}
            >
              {t('date')}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell>
            <SortControl
              direction={sortField === SortableField.AMOUNT ? sortDirection : null}
              onClick={() => onSortChange(SortableField.AMOUNT)}
            >
              {`${t('amount')}, $`}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell>{t('subscription')}</TableHeadCell>
          <TableHeadCell>
            <SortControl
              direction={sortField === SortableField.PAYMENT_METHOD ? sortDirection : null}
              onClick={() => onSortChange(SortableField.PAYMENT_METHOD)}
            >
              {t('paymentMethod')}
            </SortControl>
          </TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {payments.map(payment => (
          <TableRow key={payment.id}>
            <TableCell>
              <span className={s.banCell} style={{ paddingLeft: '5px' }}>
                {payment.avatars?.[0]?.url ? (
                  <Image
                    className={s.users_avatar}
                    src={payment.avatars[0].url}
                    alt="avatar"
                    width={36}
                    height={36}
                  />
                ) : (
                  <NoAvatar />
                )}
                <Typography variant={'small_text'}> {payment.userName}</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>{parseIsoDate(`${payment.createdAt}`)}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>{`${payment.amount} $`}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>{payment.type}</Typography>
            </TableCell>
            <TableCell className={s.payments_method}>
              {' '}
              <Typography variant={'small_text'}>{payment.paymentMethod}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  )
}
