import { Scrollbar } from '@/shared/ui/scrollbar'
import { AddComment } from '../AddComment/AddComment'
import { PostLikesAndSent } from '../PostLikesAndSent/PostLikesAndSent'
import { PostComment } from './PostComment/PostComment'
import { Typography } from '@/shared/ui/typography'
import s from './PostContent.module.scss'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { parseIsoDate } from '@/shared/utils'

// type Optional<T> = T | undefined
type PostContentProps = {
  likes: number | undefined
  whosLikes: string[] | undefined
  updatedAt: string | undefined
  createdAt: string | undefined
  ownreName: string | undefined
  description: string | undefined
}

export const PostContent = ({
  ownreName,
  description,
  likes,
  whosLikes,
  updatedAt,
  createdAt,
}: PostContentProps) => {
  //надо конвертировать дату в нормальный вид
  //доделать чтоб были картинки тех кто лайкнул как на макете
  const data = updatedAt && parseIsoDate(updatedAt)

  return (
    <div className={s.postsSide}>
      <Scrollbar className={s.postsSideContent}>
        <div className={s.postDescription}>
          <div className={s.topContent}>
            {/*<Image src={userImg} alt="postOwnerImg" width={36} height={36} />*/}
            <NoAvatar />
            <Typography variant="bold_text_14">
              {ownreName} {description}
            </Typography>
          </div>
          <div className={s.sideInfo}>{data}</div>
        </div>
        <PostComment />
        <PostComment />
        {/* тут будет map по всем комментариям к этому посту */}
      </Scrollbar>
      <PostLikesAndSent likes={likes} whosLikes={whosLikes} createdAt={createdAt} />
      <AddComment />
    </div>
  )
}
