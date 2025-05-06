'use client'
import GlobalLoader from '@/entities/loading/loading'
import { useGetPostsByUserQuery } from '@/shared/graphql/posts.generated'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { toast } from 'react-toastify'
import s from './UploadedPhotos.module.scss'

type Props = {
  userId: string
}

export const UploadedPhotos = ({ userId }: Props) => {
  const t = useTranslations('userProfile')
  const { data, loading, error } = useGetPostsByUserQuery({
    variables: { userId: +userId },
  })

  if (loading && !data) {
    return <GlobalLoader />
  }

  if (error && !data) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetPostByUser')}</div>
  }

  const photos = data?.getPostsByUser.items || []

  return photos.length > 0 ? (
    <div className={s.uploadedPhotosContainer}>
      {photos?.map(photo => (
        <Image
          key={photo.id}
          src={photo.url as string}
          width={234}
          height={228}
          alt="uploaded photo"
        />
      ))}
    </div>
  ) : (
    <div className={s.emptyContent}>{t('noUploadedPhotos')}</div>
  )
}
