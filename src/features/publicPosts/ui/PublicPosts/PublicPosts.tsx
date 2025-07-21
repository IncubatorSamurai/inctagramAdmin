'use client'
import s from './PublicPosts.module.scss'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'
import { PATH } from '@/shared/config/routes'

const PublicPosts = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(PATH.SIGNIN)
  }, [])

  return <div className={s.public_page}></div>
}
export default PublicPosts
