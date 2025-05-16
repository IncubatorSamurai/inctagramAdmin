import { client } from '@/app/_providers/apollo-client'
import { RemoveUserModal } from '@/features/UsersList/RemoveUserModal/RemoveUserModal'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { PersonRemoveIcon } from '@/shared/assets/icons/PersonRemoveIcon'
import { PATH } from '@/shared/config/routes'
import { useRemoveUserMutation } from '@/shared/graphql/removeUser.generated'
import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Typography } from '@/shared/ui/typography'
import { toast } from 'react-toastify'
import s from './DropdownUsers.module.scss'
import { BanUserModal } from '../BanUserModal/BanUserModal'

// TODO: вынести в shared
export type DropdownUsersProps = {
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
          <BanUserModal name={name} id={id} />
        </li>
        <li className={s.tableDropdownItem}>
          <Button
            variant="icon"
            onClick={() => {
              window.open(`${PATH.USERS_LIST}/${id}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <MoreHorizontalIcon />
            <Typography variant="regular_text_14">More information</Typography>
          </Button>
        </li>
      </ul>
    </Dropdown>
  )
}
