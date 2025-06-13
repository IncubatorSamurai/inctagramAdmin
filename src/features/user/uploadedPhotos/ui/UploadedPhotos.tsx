'use client'
import GlobalLoader from '@/entities/loading/loading'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useInfiniteUploadedPhotos } from '../model/useInfiniteUploadedPhotos'
import s from './UploadedPhotos.module.scss'

type Props = {
  userId: string
}

export const UploadedPhotos = ({ userId }: Props) => {
  const t = useTranslations('userProfile')

  const { photos, isFetchingMore, error, setLastElementRef, isInitialLoading } =
    useInfiniteUploadedPhotos({
      userId: +userId,
    })

  if (isInitialLoading && !photos.length) {
    return <GlobalLoader />
  }

  if (error && !photos.length) {
    toast.error(error.message)
    return <div className={s.errorDisplay}>{t('errorGetPostByUser')}</div>
  }

  if (!isInitialLoading && !photos.length) {
    return <div className={s.emptyContent}>{t('noUploadedPhotos')}</div>
  }

  return (
    <div className={s.uploadedPhotosContainer}>
      {photos?.map((photo, i) => (
        <Image
          key={photo.id}
          src={photo.url as string}
          width={234}
          height={228}
          alt="uploaded photo"
          ref={i === photos.length - 1 ? setLastElementRef : null}
        />
      ))}

      {isFetchingMore && photos.length > 0 && (
        <Typography variant="regular_text_14" className={s.loading}>
          {t('loading')}
        </Typography>
      )}
    </div>
  )
}
