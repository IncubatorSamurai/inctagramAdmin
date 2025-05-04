'use client'
import { useGetUsersQuery } from '@/shared/graphql/users.generated'
import s from './UsersListData.module.scss'
import { Input } from '@/shared/ui/input'
import { UserSelect } from '@/features/UsersList/UserSelect'
import { Pagination } from '@/shared/ui/pagination'
import { useState } from 'react'
import { UsersListTable } from '@/features/UsersList/UsersListTable/UsersListTable'

export const UsersListData = () => {
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const { data } = useGetUsersQuery({
    variables: { pageSize, pageNumber },
  })

  const pagination = data?.getUsers?.pagination
  const users = data?.getUsers?.users ?? []

  return (
    <section className={s.usersList}>
      <div className={s.userList_header}>
        <div className={s.userList_header_search}>
          <Input type="search" placeholder={'Search'} />
        </div>
        <div className={s.userList_header_select}>
          <UserSelect />
        </div>
      </div>
      <UsersListTable users={users} />
      {pagination && (
        <Pagination
          changeCurrentPage={setPageNumber}
          changeItemsPerPage={value => {
            setPageSize(value)
            setPageNumber(1)
          }}
          currentPage={pagination.page}
          pageSize={pagination.pageSize}
          totalCount={pagination.totalCount}
        />
      )}
    </section>
  )
}
