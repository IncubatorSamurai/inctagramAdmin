import { gql } from '@apollo/client'

export const GET_USERS = gql(`
  query GetUsers($pageSize: Int 
  $pageNumber: Int
  $sortBy: String = "createdAt"
  $sortDirection: SortDirection = desc
  $searchTerm: String
  $statusFilter: UserBlockStatus = ALL) {
    getUsers(pageSize: $pageSize, pageNumber: $pageNumber, sortBy: $sortBy, sortDirection: $sortDirection, searchTerm: $searchTerm,statusFilter: $statusFilter) {
      users {
        id
        userName
        createdAt
        email
        profile {
          firstName
          lastName
          userName
        }
         userBan {
        reason
        createdAt
        }
      }
      pagination {
      totalCount
    }
    }
  }
`)
