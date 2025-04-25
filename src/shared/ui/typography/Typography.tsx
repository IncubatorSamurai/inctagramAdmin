import s from './Typography.module.scss'
import { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

export const Variant = [
  'large',
  'h1',
  'h2',
  'h3',
  'regular_text_16',
  'medium_text_16',
  'bold_text_16',
  'regular_text_14',
  'medium_text_14',
  'bold_text_14',
  'small_text',
  'semi-bold_small_text',
  'regular_link',
  'small_link',
  'error',
] as const

export type VariantType = (typeof Variant)[number]

type Props = {
  asChild?: boolean
  className?: string
  variant?: VariantType
} & ComponentProps<'p'>

export const Typography = ({
  asChild,
  className,
  variant = 'regular_text_14',
  ...props
}: Props) => {
  const Comp = asChild ? Slot : 'p'
  const Style = clsx(s[variant], className)

  return <Comp className={Style} {...props}></Comp>
}
