import { forwardRef, useState } from 'react'
import s from './PublicPostItem.module.scss'
import { PublicPostImages } from '@/features/publicPosts/ui/PublicPostsList/PublicPostImages/PublicPostImages'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import { formatDistanceToNow } from 'date-fns'
import { PublicPostDescription } from '@/features/publicPosts/ui/PublicPostsList/PostDescription/PublicPostDescription'
import { BanUserModal } from '@/features/UsersList/BanUserModal'
import { GetAllPostsQuery } from '@/shared/graphql/getPosts.generated'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36
type PostItem = GetAllPostsQuery['getPosts']['items'][0]
type PublicPostItem = {
  item: PostItem
  admin?: boolean
}

export const PublicPostItem = forwardRef<HTMLLIElement, PublicPostItem>(({ item }, ref) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const toggleExpand = (postId: string) => {
    setExpandedPostId(prev => (prev === postId ? null : postId))
  }
  const isExpanded = expandedPostId === String(item.id)
  const avatarUrl =
    item.postOwner && item.postOwner.avatars && item.postOwner.avatars.length > 0
      ? (item.postOwner.avatars[0].url ?? '/default-avatar.png')
      : '/default-avatar.png'
  return (
    <li ref={ref} className={`${s.public_post} ${isExpanded ? s.expanded : ''}`}>
      <div className={s.public_posts_img}>
        <PublicPostImages
          userName={item.postOwner?.userName ?? 'Unknown user'}
          images={item.images ?? []}
          postId={String(item.id)}
          isExpanded={isExpanded}
        />
      </div>

      <div className={s.public_posts_content}>
        <div className={s.public_post_name}>
          <div className={s.public_post_img_text}>
            {item.postOwner?.avatars && item.postOwner.avatars.length > 0 ? (
              <Image
                className={s.public_post_avatar}
                src={avatarUrl}
                alt="User avatar"
                width={WIDTH_AVATAR}
                height={HEIGHT_AVATAR}
              />
            ) : (
              <NoAvatar />
            )}
            <div className={s.public_user_name}>
              <Typography variant={'h3'}>{item.postOwner?.userName || ''}</Typography>
            </div>
          </div>

          <div>
            {
              <BanUserModal
                name={item.postOwner?.userName || ''}
                id={item.postOwner?.id || 0}
                isHidden
              />
            }
          </div>
        </div>

        <div className={s.public_post_description}>
          <Typography variant={'small_text'} className={s.public_post_data}>
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </Typography>

          <PublicPostDescription
            description={item.description}
            isExpanded={isExpanded}
            onToggleExpand={() => toggleExpand(String(item.id))}
          />
        </div>
      </div>
    </li>
  )
})
PublicPostItem.displayName = 'PublicPostItem'
