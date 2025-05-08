import { Follow } from '@/shared/graphql'
import { SortableField, SortProps } from '@/shared/types'
import { SortControl } from '@/shared/ui/sort-control'
import { Root, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared/ui/table'
import { parseIsoDate } from '@/shared/utils'
import { useTranslations } from 'next-intl'

type Props = {
  follow: Follow[]
} & SortProps

export const FollowTable = ({ follow, sortField, sortDirection, onSortChange }: Props) => {
  const t = useTranslations('userProfile')

  return (
    <Root>
      <TableHead>
        <TableRow>
          <TableHeadCell>{t('userID')}</TableHeadCell>
          <TableHeadCell>
            <SortControl
              direction={sortField === SortableField.USERNAME ? sortDirection : null}
              onClick={() => onSortChange(SortableField.USERNAME)}
            >
              {t('userName')}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell>{t('profileLink')}</TableHeadCell>
          <TableHeadCell>
            <SortControl
              direction={sortField === SortableField.CREATED_AT ? sortDirection : null}
              onClick={() => onSortChange(SortableField.CREATED_AT)}
            >
              {t('subscriptionDate')}
            </SortControl>
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {follow.map(({ id, userId, userName, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{userId}</TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell>{parseIsoDate(createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  )
}
