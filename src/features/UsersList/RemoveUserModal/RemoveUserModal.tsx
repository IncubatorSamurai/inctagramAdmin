import { DialogClose, Modal } from '@/shared/ui/modal'
import s from './RemoveUserModal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'

type DeleteUser = {
  trigger: React.ReactNode
  deleteUser: () => void
  name: string
}
export const RemoveUserModal = ({ name, trigger, deleteUser }: DeleteUser) => {
  return (
    <Modal title="Delete User" className={s.deleteUserModal} trigger={trigger}>
      <div className={s.deleteUserContainer}>
        <Typography variant="regular_text_16"> {`Are you sure to delete user ${name}?`}</Typography>
        <div className={s.deleteUserBtn}>
          <DialogClose asChild>
            <Button variant="primary" fullWidth>
              No
            </Button>
          </DialogClose>
          <Button variant="outline" fullWidth onClick={deleteUser}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  )
}
