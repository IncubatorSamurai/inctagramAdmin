import { UserBlockStatus } from '@/shared/graphql'
import { SelectBox, SelectOptionsList } from '@/shared/ui/select'
import { useTranslations } from 'next-intl'

type props = {
  changeBlockStatus: (newValue: UserBlockStatus) => void
}

export const UserSelect = ({ changeBlockStatus }: props) => {
  const t = useTranslations('search')
  const optionSelectUser = [
    { id: UserBlockStatus.Blocked, label: t('blocked') },
    { id: UserBlockStatus.Unblocked, label: t('notBlocked') },
  ]

  return (
    <SelectBox placeholder={t('notSelected')} onValueChange={changeBlockStatus}>
      <SelectOptionsList options={optionSelectUser} />
    </SelectBox>
  )
}
