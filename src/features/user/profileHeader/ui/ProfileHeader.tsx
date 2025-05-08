'use client'
import { Link } from '@/i18n/routing'
import { User } from '@/shared/graphql/types'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import { Typography } from '@/shared/ui/typography'
import { parseIsoDate } from '@/shared/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import s from './ProfileHeader.module.scss'

type Props = {
  user: User
}

export const ProfileHeader = ({ user }: Props) => {
  const t = useTranslations('userProfile')
  const avatarUrl = user?.profile.avatars?.[0]?.url

  return (
    <div className={s.profileHeader}>
      <div className={s.avatarAndUserInfoWrapper}>
        {avatarUrl ? (
          <Image src={avatarUrl} width={60} height={60} alt="avatar" className={s.avatar} />
        ) : (
          <BlankCover className={s.blankCover} />
        )}

        <div className={s.userInfoWrapper}>
          <Typography variant="h1">
            {user?.profile.firstName || t('unknown')} {user?.profile.lastName || ''}
          </Typography>
          <Typography variant="regular_text_14">
            <Link href={`${process.env.NEXT_PUBLIC_URL_PROFILE}${user.id}`}>{user?.userName}</Link>
          </Typography>
        </div>
      </div>

      <div className={s.metaInfoWrapper}>
        <div>
          <Typography variant="regular_text_14">{t('userID')}</Typography>
          <Typography variant="regular_text_16">{user?.id}</Typography>
        </div>

        <div>
          <Typography variant="regular_text_14">{t('profileCreationDate')}</Typography>
          <Typography variant="regular_text_16">{parseIsoDate(user?.createdAt)}</Typography>
        </div>
      </div>
    </div>
  )
}
