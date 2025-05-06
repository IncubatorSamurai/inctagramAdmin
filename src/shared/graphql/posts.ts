import { gql } from '@apollo/client'

export const GET_POST_BY_USER = gql(`
  query GetPostsByUser($userId: Int!) {
    getPostsByUser(userId: $userId) {
      items {
        id
        url
      }
    }
  }
`)
