import { SortDirection } from '@/shared/graphql'

export enum SortableField {
  USERNAME = 'userName',
  CREATED_AT = 'createdAt',
}

export type SortProps = {
  sortField: SortableField
  sortDirection: SortDirection
  onSortChange: (newSortField: SortableField) => void
}
