import { Modal } from '@/shared/ui/modal'
import  s  from "./RemoveUserModal.module.scss"
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'


type DeleteUser = {
  trigger: React.ReactNode
  deleteUser: () => void
  name: string
}
export const RemoveUserModal = ({name ,trigger, deleteUser}:DeleteUser) => {


  return (
    <Modal title="Delete User" className={s.deleteUserModal} trigger={trigger}>
      <div className={s.deleteUserContainer}>
        <Typography variant="regular_text_14"> {`Are you sure to delete user ${name}?`}</Typography>
        <div className={s.deleteUserBtn}>
          <Button variant="primary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="primary">No</Button>
        </div>
      </div>
    </Modal>
  )


}