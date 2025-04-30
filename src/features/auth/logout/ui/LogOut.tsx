'use client'
import { LogOutModal } from '@/features/auth/logout/ui/LogOutModal/LogOutModal'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { Button } from '@/shared/ui/button/Button'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import s from './LogOutModal/LogOutModal.module.scss'
import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'

export const LogOut = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onLogOut = async () => {
    try {
      localStorage.removeItem('authorization')
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      router.push(PATH.SIGNIN)
    } catch (err) {
      console.error('Ошибка при выходе:', err)
    }
  }

  return (
    <LogOutModal
      logOut={onLogOut}
      trigger={
        <Button variant={'text'} className={s.logoutBtn}>
          <LogOutIcon /> <span>Log Out</span>
        </Button>
      }
    />
  )
}
