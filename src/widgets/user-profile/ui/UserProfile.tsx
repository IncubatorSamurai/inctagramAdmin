'use client'
import GlobalLoader from '@/entities/loading/loading'
import { ProfileHeader, ProfileTabs } from '@/features/user'
import { Link } from '@/i18n/routing'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { PATH } from '@/shared/config/routes'
import { useGetUserQuery } from '@/shared/graphql'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import s from './UserProfile.module.scss'
import { useAppDispatch } from '@/shared/hooks'
import { setIsUserProfile } from '@/shared/store'
import { useEffect } from 'react'

type Props = {
  userId: string
}

export const UserProfile = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const dispatch = useAppDispatch()
  const { data, loading, error } = useGetUserQuery({
    variables: { userId: +userId },
  })

  useEffect(() => {
    dispatch(setIsUserProfile({ isUserProfile: true }))

    return () => {
      dispatch(setIsUserProfile({ isUserProfile: false }))
    }
  }, [dispatch])

  if (loading) {
    return <GlobalLoader />
  }

  if (error || !data?.getUser) {
    return <div className={s.errorDisplay}>{t('errorGetUser')}</div>
  }

  const user = data.getUser

  return (
    <div className={s.container}>
      <Button variant="icon" asChild className={s.backButton}>
        <Link href={PATH.USERS_LIST}>
          <ArrowBackOutlineIcon />
          <Typography variant="medium_text_14">{t('backButtonText')}</Typography>
        </Link>
      </Button>

      <ProfileHeader user={user} />
      <ProfileTabs userId={userId} />
    </div>
  )
}
