'use client'
import { User } from '@/shared/graphql/types'
import {
  Root,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/shared/ui/table/Table'

import s from './UsersListTable.module.scss'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { Typography } from '@/shared/ui/typography'
import { DropdownUsers } from '@/features/UsersList/DropdownUsers/DropdownUsers'
import { useTranslations } from 'next-intl'
import { SortableField, SortProps } from '@/shared/types'
import { SortControl } from '@/shared/ui/sort-control'

export type Props = {
  users: User[]
} & SortProps

export const UsersListTable = ({ users, onSortChange, sortField, sortDirection }: Props) => {
  const t = useTranslations('search')
  return (
    <Root className={s.userTable} classNameContainer={s.containerUserTable}>
      <TableHead>
        <TableRow>
          <TableHeadCell>{t('userId')}</TableHeadCell>
          <TableHeadCell className={s.filterCell}>
            <SortControl
              direction={sortField === SortableField.USERNAME ? sortDirection : null}
              onClick={() => onSortChange(SortableField.USERNAME)}
            >
              {t('userName')}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell>{t('profileLink')}</TableHeadCell>
          <TableHeadCell className={s.filterCell}>
            <SortControl
              direction={sortField === SortableField.CREATED_AT ? sortDirection : null}
              onClick={() => onSortChange(SortableField.CREATED_AT)}
            >
              {t('dateAdded')}
            </SortControl>
          </TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <span
                className={s.banCell}
                style={user.userBan ? { paddingLeft: '5px' } : { paddingLeft: '40px' }}
              >
                {user.userBan && <BlockIcon />}
                <Typography variant={'small_text'}> {user.id}</Typography>
              </span>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>{`${user.userName}`}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>{user.userName}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant={'small_text'}>
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </Typography>
            </TableCell>
            <TableCell>
              <DropdownUsers id={user.id} name={user.userName} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  )
}
