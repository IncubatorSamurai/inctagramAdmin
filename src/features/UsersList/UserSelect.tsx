import { SelectBox } from '@/shared/ui/select'
import { SelectOptionsList } from '@/shared/ui/select/SelectOptionsList'
import { useTranslations } from 'next-intl'
import React from 'react'

export const UserSelect = () => {
const t = useTranslations('search')
  const optionSelectUser = [
    { id: 'block', label: t('blocked')},
    { id: 'non_block', label: t('notBlocked') },
  ]

  return (
    <SelectBox placeholder={t('notSelected')}>
      <SelectOptionsList options={optionSelectUser} />
    </SelectBox>
  )
}
