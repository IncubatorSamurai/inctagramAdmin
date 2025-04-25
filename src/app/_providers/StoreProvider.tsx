'use client'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/store/store'

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>
}
