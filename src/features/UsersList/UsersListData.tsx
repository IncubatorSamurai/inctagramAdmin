'use client'
import { useGetUsersQuery } from '@/shared/graphql/users.generated'
import s from './UsersListData.module.scss'
import { Input } from '@/shared/ui/input'
import { UserSelect } from '@/features/UsersList/UserSelect'
import { Pagination } from '@/shared/ui/pagination'
import { useEffect, useState } from 'react'
import { UsersListTable } from '@/features/UsersList/UsersListTable/UsersListTable'
import { useTranslations } from 'next-intl'

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export const UsersListData = () => {
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchUser, setSearchUser] = useState('')
  //control
  const [sortBy, setSortBy] = useState<'createdAt' | 'userName'>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc)

  const handleFilterChange = (field: 'createdAt' | 'userName') => {
    if (field === sortBy) {
      const newOrder = sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc
      setSortOrder(newOrder)
    } else {
      setSortBy(field)
      setSortOrder(SortOrder.asc)
    }
  }

  const [debouncedValue, setDebouncedValue] = useState(searchUser)
  const { data } = useGetUsersQuery({
    variables: {
      pageSize,
      pageNumber,
      sortBy: sortBy,
      searchTerm: debouncedValue,
      sortDirection: sortOrder,
    },
  })

  const pagination = data?.getUsers?.pagination
  const users = data?.getUsers?.users ?? []

  useEffect(() => {
    const handlerTimeOut = setTimeout(() => {
      setDebouncedValue(searchUser)
    }, 500)

    return () => {
      clearTimeout(handlerTimeOut)
    }
  }, [searchUser])

  const t = useTranslations('search')
  return (
    <section className={s.usersList}>
      <div className={s.userList_header}>
        <div className={s.userList_header_search}>
          <Input
            type="search"
            placeholder={t('search')}
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
          />
        </div>
        <div className={s.userList_header_select}>
          <UserSelect />
        </div>
      </div>
      <UsersListTable
        users={users}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onFilterChange={handleFilterChange}
      />
      {pagination && (
        <Pagination
          changeCurrentPage={setPageNumber}
          changeItemsPerPage={value => {
            setPageSize(value)
            setPageNumber(1)
          }}
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </section>
  )
}
