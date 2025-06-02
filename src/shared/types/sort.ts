import { SortDirection } from '@/shared/graphql'

export enum SortableField {
  USERNAME = 'userName',
  CREATED_AT = 'createdAt',
  AMOUNT =  'amount',
  PAYMENT_METHOD = 'paymentMethod',
}

export type SortProps = {
  sortField: SortableField
  sortDirection: SortDirection
  onSortChange: (newSortField: SortableField) => void
}
