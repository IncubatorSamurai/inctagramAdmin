'use client'

import {ReactNode} from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

type Props = {
    children: ReactNode
}

export const GqlProvider = ({children}: Props) => {
    const apolloClient = new ApolloClient({
        uri: 'https://inctagram.work/api/v1/graphql',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    );
};