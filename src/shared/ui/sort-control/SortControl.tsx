import { ArrowIcon } from '@/shared/assets/icons/ArrowIcon'
import { SortDirection } from '@/shared/graphql'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import clsx from 'clsx'
import { ReactNode } from 'react'
import s from './SortControl.module.scss'

type Props = {
  direction: SortDirection | null
  onClick: () => void
  children: ReactNode
}

export const SortControl = ({ direction, onClick, children }: Props) => {
  const classNames = {
    activeArrow: clsx(s.arrowIcon, s.active, direction === SortDirection.Desc && s.arrowDown),
    arrowDown: clsx(s.arrowIcon, s.arrowDown),
  }

  return (
    <Button variant={'icon'} onClick={onClick}>
      <Typography variant="bold_text_14" asChild>
        <span>{children}</span>
      </Typography>
      {direction ? (
        <ArrowIcon className={classNames.activeArrow} />
      ) : (
        <div className={s.arrowIconsWrapper}>
          <ArrowIcon className={s.arrowIcon} />
          <ArrowIcon className={classNames.arrowDown} />
        </div>
      )}
    </Button>
  )
}
