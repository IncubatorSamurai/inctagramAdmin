import { DialogClose, Modal } from '@/shared/ui/modal'
import s from './UserListModal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useTranslations } from 'next-intl'

type Props = {
  trigger: React.ReactNode
  title: string
  description: string
  onClick: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const UserListModal = ({
  trigger,
  title,
  description,
  onClick,
  open,
  onOpenChange,
}: Props) => {
  const t = useTranslations('usersList')

  return (
    <Modal
      title={title}
      className={s.modal}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className={s.container}>
        <Typography variant="regular_text_16">{description}</Typography>

        <div className={s.buttonsContainer}>
          <DialogClose asChild>
            <Button variant="outline" className={s.button}>
              {t('no')}
            </Button>
          </DialogClose>
          <Button variant="primary" className={s.button} onClick={onClick}>
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
