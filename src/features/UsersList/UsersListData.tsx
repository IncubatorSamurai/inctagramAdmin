'use client'
import { useGetUsersQuery } from '@/shared/graphql/users.generated'
import s from './UsersListData.module.scss'
import { Input } from '@/shared/ui/input'
import { UserSelect } from '@/features/UsersList/UserSelect'
import { Pagination } from '@/shared/ui/pagination'
import { useEffect, useState } from 'react'
import { UsersListTable } from '@/features/UsersList/UsersListTable/UsersListTable'
import { useTranslations } from 'next-intl'
import { useSortAndPagination } from '@/shared/hooks'
import { UserBlockStatus } from '@/shared/graphql'

export const UsersListData = () => {
  const [searchUser, setSearchUser] = useState('')
  const [currentBlockStatus, setCurrentBlockStatus] = useState<UserBlockStatus>(UserBlockStatus.All)
  const {
    pageSize,
    pageNumber,
    sortField,
    sortDirection,
    setPageNumber,
    handleSortChange,
    handlePageSizeChange,
  } = useSortAndPagination()

  const [debouncedValue, setDebouncedValue] = useState(searchUser)
  const { data } = useGetUsersQuery({
    variables: {
      pageSize,
      pageNumber,
      sortBy: sortField,
      searchTerm: debouncedValue,
      sortDirection,
      statusFilter: currentBlockStatus,
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
          <UserSelect changeBlockStatus={setCurrentBlockStatus} />
        </div>
      </div>
      <UsersListTable
        users={users}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      {pagination && (
        <Pagination
          changeCurrentPage={setPageNumber}
          changeItemsPerPage={handlePageSizeChange}
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </section>
  )
}
