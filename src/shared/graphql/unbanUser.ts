import { gql } from '@apollo/client'

export const UNBAN_USER = gql(`mutation UnbanUser($userId: Int!) {
  unbanUser(userId: $userId)
}`)
