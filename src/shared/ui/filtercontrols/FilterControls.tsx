import s from './FilterControls.module.scss'
import { Button } from '@/shared/ui/button'
import { ArrowIcon } from '@/shared/assets/icons/ArrowIcon'
import clsx from 'clsx'

type Props = {
  className?: string
  onClick?: () => void
}
export const FilterControls = ({ className, onClick }: Props) => {
  return (
    <div className={s.filter_controls}>
      <Button
        variant={'icon'}
        className={clsx(s.arrow, s.filter_arrow_up, className)}
        onClick={onClick}
      >
        <ArrowIcon />
      </Button>
      <Button
        variant={'icon'}
        className={clsx(s.arrow, s.filter_arrow_down, className)}
        onClick={onClick}
      >
        <ArrowIcon />
      </Button>
    </div>
  )
}
