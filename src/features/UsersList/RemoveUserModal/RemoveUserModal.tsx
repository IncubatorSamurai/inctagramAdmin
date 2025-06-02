import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { UserListModal } from '@/features/UsersList/UserListModal'
import React, { useState } from 'react'
import { PersonRemoveIcon } from '@/shared/assets/icons/PersonRemoveIcon'
import { useTranslations } from 'next-intl'
import { useRemoveUserMutation } from '@/shared/graphql'
import { toast } from 'react-toastify'
import { client } from '@/app/_providers/apollo-client'

type DeleteUser = {
  name: string
  id: number
}
export const RemoveUserModal = ({ id, name }: DeleteUser) => {
  const t = useTranslations('usersList')
  const [open, setOpen] = useState(false)
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
    <UserListModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="icon">
          <PersonRemoveIcon />
          <Typography variant="regular_text_14">{t('deleteUser')}</Typography>
        </Button>
      }
      title={t('deleteUser')}
      description={`${t('deleteDescriptionForModal')} ${name}?`}
      onClick={handleDelete}
    />
  )
}
