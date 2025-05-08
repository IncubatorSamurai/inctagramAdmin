import { useState } from 'react'
import { SortableField } from '../types'
import { SortDirection } from '../graphql'

const PAGE_SIZE = 10
const PAGE_NUMBER = 1

export const useSortAndPagination = (
  defaultSortField: SortableField = SortableField.CREATED_AT
) => {
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER)
  const [sortField, setSortField] = useState<SortableField>(defaultSortField)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  const handleSortChange = (newSortField: SortableField) => {
    if (newSortField === sortField) {
      setSortDirection(
        sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
      )
    } else {
      setSortField(newSortField)
      setSortDirection(SortDirection.Desc)
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPageNumber(1)
  }

  return {
    pageSize,
    pageNumber,
    sortField,
    sortDirection,
    setPageNumber,
    handleSortChange,
    handlePageSizeChange,
  }
}
