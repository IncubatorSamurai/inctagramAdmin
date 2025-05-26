'use client'
import s from './PublicPostsList.module.scss'
import { PublicPostItem } from '@/features/publicPosts/ui/PublicPostsList/PublicPostItem/PublicPostItem'
import React from 'react'
import { GetAllPostsQuery } from '@/shared/graphql/getPosts.generated'

type PostItem = GetAllPostsQuery['getPosts']['items'][number]

type PublicPostsListProps = {
  items: PostItem[]
  lastPostRef?: React.Ref<HTMLLIElement>
}

export const PublicPostsList = ({ items, lastPostRef }: PublicPostsListProps) => {
  return (
    <ul className={s.public_posts}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return <PublicPostItem key={item.id} item={item} ref={isLast ? lastPostRef : undefined} />
      })}
    </ul>
  )
}
