// 'use client'
// import s from './PublicPostsList.module.scss'
// import { Post } from '@/shared/api/post/postApi.types'
// import { PublicPostItem } from '@/features/publicPosts/ui/PublicPostsList/PublicPostItem/PublicPostItem'

// type PublicPostsList = {
//   items: Post[]
//   lastPostRef?: React.Ref<HTMLDivElement>
// }

// export const PublicPostsList = ({ items,lastPostRef }: PublicPostsList) => {
//   return (
//     <>
//       <ul className={s.public_posts}>
//         {items.map((item,index) => {
//           return <PublicPostItem item={item} key={String(item.id) } />
//         })}
//       </ul>
//     </>
//   )
// }

'use client'
import s from './PublicPostsList.module.scss'
import { Post } from '@/shared/api/post/postApi.types'
import { PublicPostItem } from '@/features/publicPosts/ui/PublicPostsList/PublicPostItem/PublicPostItem'
import React from 'react'

type PublicPostsListProps = {
  items: Post[]
  lastPostRef?: React.Ref<HTMLLIElement> // поменял на HTMLLIElement
}

export const PublicPostsList = ({ items, lastPostRef }: PublicPostsListProps) => {
  return (
    <ul className={s.public_posts}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <PublicPostItem
            key={String(item.id)}
            item={item}
            ref={isLast ? lastPostRef : undefined}
          />
        )
      })}
    </ul>
  )
}
