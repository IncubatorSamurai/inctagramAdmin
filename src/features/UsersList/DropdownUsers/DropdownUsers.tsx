import React from 'react'
import s from './DropdownUsers.module.scss'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { Button } from '@/shared/ui/button'
import { PersonRemoveIcon } from '@/shared/assets/icons/PersonRemoveIcon'
import { Typography } from '@/shared/ui/typography'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { Dropdown } from '@/shared/ui/dropdown'
import { useRemoveUserMutation } from '@/shared/graphql/removeUser.generated'
import { toast } from 'react-toastify'
import { client } from '@/app/_providers/apollo-client'
import { RemoveUserModal } from '@/features/UsersList/RemoveUserModal/RemoveUserModal'

type DropdownUsersProps = {
  id: number
  name: string
}

export const DropdownUsers = ({ id, name }: DropdownUsersProps) => {
  const [removeUserMutation] = useRemoveUserMutation()

  const handleDelete = async () => {
    try {
      await removeUserMutation({ variables: { id } })
      toast.success('Пользователь удалён')
      await client.refetchQueries({
        include: ['GetUsers'],
      })
    } catch {
      toast.error('Ошибка при удалении пользователя')
    }
  }

  return (
    <Dropdown className={s.userList_dropdown} iconTrigger={<MoreHorizontalIcon />}>
      <ul className={s.tableDropdownList}>
        <li className={s.tableDropdownItem}>
          <RemoveUserModal
            trigger={
              <Button variant="icon">
                <PersonRemoveIcon />
                <Typography variant="regular_text_14">Delete User</Typography>
              </Button>
            }
            deleteUser={handleDelete}
            name={name}
          />
        </li>
        <li className={s.tableDropdownItem}>
          <Button variant="icon">
            <BlockIcon />
            <Typography variant="regular_text_14">Ban in the System</Typography>
          </Button>
        </li>
        <li className={s.tableDropdownItem}>
          <Button variant="icon">
            <MoreHorizontalIcon />
            <Typography variant="regular_text_14">More information</Typography>
          </Button>
        </li>
      </ul>
    </Dropdown>
  )
}
