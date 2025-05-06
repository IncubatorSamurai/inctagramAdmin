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
          id
          firstName
          lastName
          userName
          createdAt
        }
        userBan {
        reason
        createdAt
        }
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
    }
    }
  }
`)

export const GET_USER = gql(`
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      email
      createdAt
      profile {
        id
        firstName
        lastName
        createdAt
        avatars {
          url
        }
      }
    }
  }
`)
