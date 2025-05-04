import { gql } from '@apollo/client'

export const removeUser = gql(`mutation RemoveUser($id: Int!) {
  removeUser(userId: $id)
}`)
