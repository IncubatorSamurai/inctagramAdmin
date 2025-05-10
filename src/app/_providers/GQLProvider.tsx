'use client'

import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/app/_providers/apollo-client'

type Props = {
  children: ReactNode
}

export const GqlProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
