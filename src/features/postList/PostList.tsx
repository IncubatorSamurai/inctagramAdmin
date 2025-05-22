'use client'
import { Input } from '@/shared/ui/input'
import s from './postList.module.scss'
import { PublicPostsList } from '../publicPosts/ui/PublicPostsList/PublicPostsList'
import { useTranslations } from 'next-intl'
import { useNormalizedPosts } from '@/shared/hooks/useGetPostsSubscription'

export const PostListSub = () => {
  const t = useTranslations('search')
  //
  //

  const { posts, loading, error, setSearchTerm, searchTerm, lastPostRef } = useNormalizedPosts()
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading posts</div>
  return (
    <div className={s.root}>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type="search"
        placeholder={t('search')}
      />
      <PublicPostsList items={posts} lastPostRef={lastPostRef} />
    </div>
  )
}

//   const { data, loading, error } = useGetAllPostsQuery({
//     variables: {
//       endCursorPostId: 0,
//       searchTerm: '',
//     },
//   })
//   const postsFromServer = data?.getPosts.items ?? [];
//   const {data: subscriptionData} = useGetNewPostsSubscription()
//   console.log(subscriptionData);

//  const normalizedPosts: Post[] = postsFromServer.map(item => ({
//   id: item.id,
//   userName: item.postOwner?.userName ?? '',
//   description: item.description,
//   location: '',
//  images: item.images?.map(img => ({
//     url: img.url ?? '',
//     width: 0,
//     height: 0,
//     fileSize: 0,
//     createdAt: '',
//     uploadId: '',
//   })) ?? [],
//   createdAt: item.createdAt,
//   updatedAt: '',
//   ownerId: item.id,
//   avatarOwner: item.postOwner?.avatars?.[0]?.url ?? '',
//   owner: {
//     id: 0, // не знаю надо ли будет
//     userName: item.postOwner?.userName ?? '',
//     avatarUrl: item.postOwner?.avatars?.[0]?.url ?? '',
//   },
//   likesCount: 0,
//   isLiked: false,
//   avatarWhoLikes: false,
// }));
