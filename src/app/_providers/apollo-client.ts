import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA,
})

const authLink = setContext((_, { headers, token }) => {
  const authtoken = token || localStorage.getItem('authorization')
  return {
    headers: {
      ...headers,
      authorization: authtoken ? `Basic ${authtoken}` : '',
    },
  }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
}, authLink.concat(httpLink))

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
