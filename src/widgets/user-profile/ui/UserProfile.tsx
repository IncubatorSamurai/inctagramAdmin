'use client'
import GlobalLoader from '@/entities/loading/loading'
import { ProfileHeader, ProfileTabs } from '@/features/user'
import { Link } from '@/i18n/routing'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { PATH } from '@/shared/config/routes'
import { useGetUserQuery } from '@/shared/graphql/users.generated'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import s from './UserProfile.module.scss'

type Props = {
  userId: string
}

export const UserProfile = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const { data, loading, error } = useGetUserQuery({
    variables: { userId: +userId },
  })

  if (loading) {
    return <GlobalLoader />
  }

  if (error || !data?.getUser) {
    return <div className={s.errorDisplay}>{t('errorGetUser')}</div>
  }

  const user = data?.getUser

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
