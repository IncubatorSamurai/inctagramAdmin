import { client } from '@/app/_providers/apollo-client'
import { RemoveUserModal } from '@/features/UsersList/RemoveUserModal/RemoveUserModal'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { PersonRemoveIcon } from '@/shared/assets/icons/PersonRemoveIcon'
import { PATH } from '@/shared/config/routes'
import { UserBan, useRemoveUserMutation, useUnbanUserMutation } from '@/shared/graphql'
import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { UserListModal } from '../UserListModal'
import s from './DropdownUsers.module.scss'

type DropdownUsersProps = {
  id: number
  name: string
  userBan: UserBan | null
}

export const DropdownUsers = ({ id, name, userBan }: DropdownUsersProps) => {
  const t = useTranslations('usersList')
  const [removeUserMutation] = useRemoveUserMutation()
  const [unbanUser] = useUnbanUserMutation()

  const handleDelete = async () => {
    try {
      await removeUserMutation({ variables: { id } })
      toast.success(t('successDeleteUser'))
      await client.refetchQueries({
        include: ['GetUsers'],
      })
    } catch {
      toast.error(t('errorDeleteUser'))
    }
  }

  const handleUnbanUser = async () => {
    try {
      await unbanUser({ variables: { userId: id } })
      toast.success(t('successUnbanUser'))
      await client.refetchQueries({
        include: ['GetUsers'],
      })
    } catch {
      toast.error(t('errorUnbanUser'))
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
                <Typography variant="regular_text_14">{t('deleteUser')}</Typography>
              </Button>
            }
            deleteUser={handleDelete}
            name={name}
          />
        </li>
        <li className={s.tableDropdownItem}>
          {!userBan ? (
            <Button variant="icon">
              <BlockIcon />
              <Typography variant="regular_text_14">{t('banInTheSystem')}</Typography>
            </Button>
          ) : (
            <UserListModal
              trigger={
                <Button variant="icon">
                  <BlockIcon />
                  <Typography variant="regular_text_14">{t('unban')}</Typography>
                </Button>
              }
              title={t('unban')}
              description={`${t('unbanDescriptionForModal')} ${name}?`}
              onClick={handleUnbanUser}
            />
          )}
        </li>
        <li className={s.tableDropdownItem}>
          <Button
            variant="icon"
            onClick={() => {
              window.open(`${PATH.USERS_LIST}/${id}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <MoreHorizontalIcon />
            <Typography variant="regular_text_14">{t('moreInformation')}</Typography>
          </Button>
        </li>
      </ul>
    </Dropdown>
  )
}
