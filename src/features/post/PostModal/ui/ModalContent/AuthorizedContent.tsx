import { RightSideHeader } from '@/features/post/PostModal/ui/RightSideHeader/RightSideHeader'
import s from './../PostsModal.module.scss'
import { useGetPostByIdQuery } from '@/shared/api/post/postApi'
import { EditDescriptionPost } from '@/features/post/PostModal/ui/EditDescriptionPost/EditDiscriptionPost'
import { PostContent } from '@/features/post/PostModal/ui/PostContent/PostContent'

type AuthorizedContentProps = {
  postId: number
  changeEdit: () => void
  openEdit: boolean
  showDeleteModalHandler: () => void
}
export const AuthorizedContent = ({
  showDeleteModalHandler,
  openEdit,
  changeEdit,
  postId,
}: AuthorizedContentProps) => {
  const { data } = useGetPostByIdQuery({ id: postId })
  return (
    <div className={s.rightSide}>
      <RightSideHeader
        postUserName={data?.userName}
        changeEdit={changeEdit}
        isOpenEdit={openEdit}
        showDeleteModalHandler={showDeleteModalHandler}
      />
      {openEdit ? (
        <EditDescriptionPost
          postId={postId}
          description={data?.description}
          changeEdit={changeEdit}
        />
      ) : (
        <PostContent
          description={data?.description}
          ownreName={data?.userName}
          likes={data?.likesCount}
          whosLikes={data?.avatarWhoLikes}
          updatedAt={data?.updatedAt}
          createdAt={data?.createdAt}
        />
      )}
    </div>
  )
}
