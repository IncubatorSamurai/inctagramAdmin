import { SelectBox } from '@/shared/ui/select'
import { SelectOptionsList } from '@/shared/ui/select/SelectOptionsList'
import React from 'react'

export const UserSelect = () => {
  const optionSelectUser = [
    { id: 'block', label: 'Blocked' },
    { id: 'non_block', label: 'Not Blocked' },
  ]

  return (
    <SelectBox placeholder={'Not selected'}>
      <SelectOptionsList options={optionSelectUser} />
    </SelectBox>
  )
}
