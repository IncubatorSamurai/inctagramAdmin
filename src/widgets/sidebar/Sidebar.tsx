'use client'
import { v4 as uuidv4 } from 'uuid'

import s from './Sidebar.module.scss'

import { LogOut } from '@/features/auth/logout/ui/LogOut'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { BookMarkIcon } from '@/shared/assets/icons/BookMarkIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { CreditCartIcon } from '@/shared/assets/icons/CreditCardIcon'
import { CreditCardOutlineIcon } from '@/shared/assets/icons/CreditCardOutlineIcon'
import { HomeIcon } from '@/shared/assets/icons/HomeIcon'
import { HomeOutlineIcon } from '@/shared/assets/icons/HomeOutlineIcon'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { MessageCircleIcon } from '@/shared/assets/icons/MessageCircleIcon'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { PersonIcon } from '@/shared/assets/icons/PersonIcon'
import { PersonOutlineIcon } from '@/shared/assets/icons/PersonOutlineIcon'
import { PlusSquareIcon } from '@/shared/assets/icons/PlusSquareIcon'
import { PlusSquareOutlineIcon } from '@/shared/assets/icons/PlusSquareOutlineIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { SearchOutlineIcon } from '@/shared/assets/icons/SearchOutlineIcon'
import { SettingsIcon } from '@/shared/assets/icons/SettingsIcon'
import { SettingsOutlineIcon } from '@/shared/assets/icons/SettingsOutlineIcon'
import { TrendingUpIcon } from '@/shared/assets/icons/TrendingUpIcon'
import { TrendingUpOutlineIcon } from '@/shared/assets/icons/TrendingUpOutlineIcon'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button/Button'
import { NavItem } from '@/shared/ui/nav-item'
import clsx from 'clsx'
import { useState } from 'react'
import { AddPostModal } from '../post'

export const sidebarItems = {
  primary: [
    {
      id: uuidv4(),
      name: 'Home',
      icon: <HomeOutlineIcon />,
      href: PATH.HOME,
      disabled: false,
      classItem: 'home',
      activeIcon: <HomeIcon />,
    },
    {
      id: uuidv4(),
      name: 'Create',
      icon: <PlusSquareOutlineIcon />,
      href: '#',
      disabled: false,
      classItem: 'create',
      activeIcon: <PlusSquareIcon />,
    },
    {
      id: uuidv4(),
      name: 'My Profile',
      icon: <PersonOutlineIcon />,
      href: PATH.MYPROFILE,
      disabled: false,
      classItem: 'profile',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Messenger',
      icon: <MessageCircleOutlineIcon />,
      href: PATH.MESSENGER,
      disabled: false,
      classItem: 'messenger',
      activeIcon: <MessageCircleIcon />,
    },
    {
      id: uuidv4(),
      name: 'Search',
      icon: <SearchOutlineIcon />,
      href: PATH.SEARCH,
      disabled: false,
      classItem: 'search',
      activeIcon: <SearchIcon />,
    },
  ],
  secondary: [
    {
      id: uuidv4(),
      name: 'Profile Settings ',
      icon: <SettingsOutlineIcon />,
      href: PATH.SETTINGS,
      disabled: false,
      classItem: 'settings',
      activeIcon: <SettingsIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Favorites',
      icon: <BookMarkOutlineIcon />,
      href: PATH.FAVORITES,
      disabled: false,
      classItem: 'favorites',
      activeIcon: <BookMarkIcon />,
    },
  ],
  specialAdmin: [
    {
      id: uuidv4(),
      name: 'Users List',
      icon: <PersonOutlineIcon />,
      href: PATH.USERS_LIST,
      disabled: false,
      classItem: 'user_list',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Payments List ',
      icon: <CreditCardOutlineIcon />,
      href: PATH.PAYMENTS_LIST,
      disabled: false,
      classItem: 'payment',
      activeIcon: <CreditCartIcon />,
    },
    {
      id: uuidv4(),
      name: 'Posts List ',
      icon: <ImageOutlineIcon />,
      href: PATH.POSTS_LIST,
      disabled: false,
      classItem: 'posts',
      activeIcon: <ImageIcon />,
    },
  ],
}

type Sidebar = {
  isAdmin?: boolean
}

export const Sidebar = ({ isAdmin }: Sidebar) => {
  const { data: meInfo } = useMeQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <nav className={s.sidebar}>
      {isAdmin ? (
        <ul className={clsx(s.sidebar_list, s.secondary)}>
          {sidebarItems.specialAdmin.map(item => (
            <NavItem key={item.id} {...item} />
          ))}
          <LogOut />
        </ul>
      ) : (
        <>
          <ul className={clsx(s.sidebar_list, s.primary)}>
            {sidebarItems.primary.map(item => {
              if (item.name === 'Create') {
                return (
                  <li
                    className={clsx(s.create_item, item.classItem, { [s.active]: isModalOpen })}
                    key={item.id}
                    data-disabled={item.disabled}
                  >
                    <Button
                      variant={'icon'}
                      className={s.nav_create_btn}
                      onClick={() => setIsModalOpen(true)}
                    >
                      {isModalOpen ? item.activeIcon : item.icon}
                      <span className={s.nav_name}>{item.name}</span>
                    </Button>
                  </li>
                )
              } else if (item.name === 'My Profile') {
                item = { ...item, href: `${item.href}/${meInfo?.userId}` }
              }
              return <NavItem key={item.id} {...item} />
            })}
          </ul>
          <ul className={clsx(s.sidebar_list, s.secondary)}>
            {sidebarItems.secondary.map(item => (
              <NavItem key={item.id} {...item} />
            ))}
            <LogOut />
          </ul>
        </>
      )}
      {isModalOpen && <AddPostModal open={isModalOpen} onChange={setIsModalOpen} />}
    </nav>
  )
}
