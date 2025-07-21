import { gql } from '@apollo/client'

export const GET_POSTS_SUB_ALL = gql(`
 query getAllPosts ($endCursorPostId: Int, $searchTerm: String) {
  getPosts (endCursorPostId: $endCursorPostId, searchTerm: $searchTerm ) {
    totalCount
    pageSize
    pagesCount
    items {
    description
     createdAt
      postOwner {
      id
       userName
        avatars {
          url
        }
      }
      id
      images {
        url
      }
      userBan {
        reason
      }
    }
  }
}
`)
