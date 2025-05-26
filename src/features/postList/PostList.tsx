'use client'
import { Input } from '@/shared/ui/input'
import s from './postList.module.scss'
import { PublicPostsList } from '../publicPosts/ui/PublicPostsList/PublicPostsList'
import { useTranslations } from 'next-intl'
import { useNormalizedPosts } from '@/shared/hooks/useGetPostsSubscription'

export const PostListSub = () => {
  const t = useTranslations('search')
  const { posts, error, setSearchTerm, searchTerm, lastPostRef } = useNormalizedPosts()
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
