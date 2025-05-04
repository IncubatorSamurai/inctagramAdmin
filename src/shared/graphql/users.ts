import { gql } from '@apollo/client'

export const GET_USERS = gql(`
  query GetUsers($pageSize: Int = 10
  $pageNumber: Int = 1
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
          id
          createdAt
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
      page
      pageSize
      pagesCount
      totalCount
    }
    }
  }
`)
