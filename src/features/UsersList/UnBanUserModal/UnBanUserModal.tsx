import React, { useState } from 'react'
import { UserListModal } from '@/features/UsersList/UserListModal'
import { Button } from '@/shared/ui/button'
import { UnblockIcon } from '@/shared/assets/icons/UnblockIcon'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { client } from '@/app/_providers/apollo-client'
import { UserIdAndNameProps } from '@/shared/types'
import { useUnbanUserMutation } from '@/shared/graphql'

export const UnBanUserModal = ({ name, id }: UserIdAndNameProps) => {
  const t = useTranslations('usersList')
  const [unbanUser] = useUnbanUserMutation()
  const [open, setOpen] = useState(false)

  const handleUnbanUser = async () => {
    try {
      await unbanUser({ variables: { userId: id } })
      toast.success(t('successUnbanUser'))
      await client
        .refetchQueries({
          include: ['GetUsers'],
        })
        .then(() => setOpen(false))
    } catch {
      toast.error(t('errorUnbanUser'))
    }
  }

  return (
    <UserListModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="icon">
          <UnblockIcon />
          <Typography variant="regular_text_14">{t('unban')}</Typography>
        </Button>
      }
      title={t('unban')}
      description={`${t('unbanDescriptionForModal')} ${name}?`}
      onClick={handleUnbanUser}
    />
  )
}
