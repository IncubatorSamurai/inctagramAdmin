'use client'
import { Scrollbar } from '@/shared/ui/scrollbar/Scrollbar'
import s from './layout.module.scss'
import { Sidebar } from '@/widgets/sidebar'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useParams } from 'next/navigation'

export default function LayoutLoggedIn({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const params = useParams()
  const userId = params?.userId

  return (
    <div className={s.layout_container}>
      {isLoggedIn && !userId && <Sidebar isAdmin={true} />}
      <Scrollbar type={'auto'} className={s.layout_scroll}>
        {children}
      </Scrollbar>
    </div>
  )
}
