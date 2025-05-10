import { gql } from '@apollo/client'

export const GET_PAYMENT_BY_USER = gql(`
  query GetPaymentsByUser(
    $userId: Int!, 
    $pageSize: Int = 10, 
    $pageNumber: Int = 1, 
    $sortBy: String = "createdAt", 
    $sortDirection: SortDirection = desc
    ) {
    getPaymentsByUser(userId: $userId, pageSize: $pageSize, pageNumber: $pageNumber, sortBy: $sortBy, sortDirection: $sortDirection) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        businessAccountId
        status
        dateOfPayment
        endDate
        type
        price
        paymentType
        payments {
          id
        }
      }
    } 
  }
`)
