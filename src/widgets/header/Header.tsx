'use client'
import React, { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import s from './Header.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Link } from '@/i18n/routing'
import { LangSelect } from '@/shared/ui/langSelect/LangSelect'

import { PATH } from '@/shared/config/routes'

import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

type HeaderType = {
  headerTitle?: string
  headerLogo?: string
  isAdmin?: boolean
} & ComponentPropsWithoutRef<'header'>

const Header = ({ isAdmin, headerTitle, headerLogo, ...rest }: HeaderType) => {
  // Resize watching
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <>
      <header className={s.header} {...rest}>
        <div className={s.container}>
          <Link className={s.header_logo} href={isLoggedIn ? PATH.USERS_LIST : PATH.SIGNIN}>
            {headerLogo && (
              <Image
                src={headerLogo}
                alt={headerTitle || 'Логотип'}
                width={150}
                height={50}
                priority
              />
            )}
            <Typography variant={'large'}>{headerTitle} </Typography>
            {isAdmin && (
              <Typography variant={'small_text'}>
                Super<b>Admin</b>
              </Typography>
            )}
          </Link>
          <nav className={s.main_nav}>
            <LangSelect />
          </nav>
        </div>
      </header>
    </>
  )
}

export { Header }
