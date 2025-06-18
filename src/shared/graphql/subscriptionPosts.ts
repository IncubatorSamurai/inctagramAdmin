import { gql } from '@apollo/client'

export const POSTS_SUBSCRIPTION = gql(`
    subscription getNewPosts{
  postAdded {
  id
    images {
      url
      
    }
    createdAt
    description
    userBan {
      reason
    }
    postOwner {
      id
      userName
      avatars {
        url
      }
    }
  }
}
    `)
