import type { ReactElement } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '~/api/apollo-client'

export function Providers(props: { children: ReactElement | ReactElement[] }) {
  return <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
}
