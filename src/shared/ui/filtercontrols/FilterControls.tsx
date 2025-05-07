import s from './FilterControls.module.scss'
import { Button } from '@/shared/ui/button'
import { ArrowIcon } from '@/shared/assets/icons/ArrowIcon'
import clsx from 'clsx'

type Props = {
  className?: string
  filterSort: 'userName' | 'createdAt'
  activeSort: 'userName' | 'createdAt'
  activeDirection: 'up' | 'down'
  onChange: (field: 'userName' | 'createdAt') => void
  onClick?: () => void
}

export const FilterControls = ({ filterSort, activeSort, activeDirection, onChange }: Props) => {
  const isActive = activeSort === filterSort

  return (
    <div className={clsx(s.filter_controls, isActive && s.centered)}>
      {!isActive || activeDirection === 'up' ? (
        <Button
          variant="icon"
          className={clsx(s.arrow, s.filter_arrow_up, isActive && s.active)}
          onClick={() => onChange(filterSort)}
        >
          <ArrowIcon />
        </Button>
      ) : null}

      {!isActive || activeDirection === 'down' ? (
        <Button
          variant="icon"
          className={clsx(s.arrow, s.filter_arrow_down, isActive && s.active)}
          onClick={() => onChange(filterSort)}
        >
          <ArrowIcon />
        </Button>
      ) : null}
    </div>
  )
}
