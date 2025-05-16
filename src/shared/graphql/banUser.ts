import { gql } from '@apollo/client'

export const GET_FOLLOWERS = gql(`mutation BanUser($userId: Int!, $banReason: String!) {
  banUser(userId: $userId, banReason: $banReason)
}`)
