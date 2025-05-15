import { Button } from '@/shared/ui/button'
import s from './BanUser.modules.scss'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { Typography } from '@/shared/ui/typography'

export const BanUser = () => {
  return (
    <Button variant="icon">
      <BlockIcon />
      <Typography variant="regular_text_14">Ban in the System</Typography>
    </Button>
  )
}
