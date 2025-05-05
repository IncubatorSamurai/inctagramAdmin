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
import { FilterControls } from '@/shared/ui/filtercontrols/FilterControls'
import { DropdownUsers } from '@/features/UsersList/DropdownUsers/DropdownUsers'


export type Props = {
  users: User[]
}

export const UsersListTable = ({ users }: Props) => {
  return (
    <Root className={s.userTable} classNameContainer={s.containerUserTable}>
      <TableHead>
        <TableRow>
          <TableHeadCell>User ID</TableHeadCell>
          <TableHeadCell className={s.filterCell}>
            Username <FilterControls />
          </TableHeadCell>
          <TableHeadCell>Profile link</TableHeadCell>
          <TableHeadCell className={s.filterCell}>
            Date added <FilterControls />
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
              <Typography
                variant={'small_text'}
              >{`${user.userName}`}</Typography>
               {/* >{`${user.profile.firstName} ${user.profile.lastName} `}</Typography>  */}
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
