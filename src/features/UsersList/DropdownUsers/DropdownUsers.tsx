import { client } from '@/app/_providers/apollo-client'
import { RemoveUserModal } from '@/features/UsersList/RemoveUserModal/RemoveUserModal'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { PersonRemoveIcon } from '@/shared/assets/icons/PersonRemoveIcon'
import { PATH } from '@/shared/config/routes'
import { UserBan, useRemoveUserMutation } from '@/shared/graphql'
import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import s from './DropdownUsers.module.scss'
import { UnBanUserModal } from '@/features/UsersList/UnBanUserModal'
import { BanUserModal } from '@/features/UsersList/BanUserModal'

export type Props = {
  id: number
  name: string
  userBan: UserBan | null
}

export const DropdownUsers = ({ id, name, userBan }: Props) => {
  const t = useTranslations('usersList')
  const [removeUserMutation] = useRemoveUserMutation()

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
          {!userBan ? <BanUserModal name={name} id={id} /> : <UnBanUserModal name={name} id={id} />}
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
