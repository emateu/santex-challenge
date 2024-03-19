// https://docs.vendure.io/guides/storefront/connect-api/#apollo-client

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const API_URL = 'https://demo.vendure.io/shop-api'

// Store the token in localStorage using this key.
const AUTH_TOKEN_KEY = 'auth_token'

const httpLink = new HttpLink({
  uri: () => {
    return API_URL
  },
  // This is required if using cookie-based session management, so that any cookies get sent with the request.
  credentials: 'include',
})

// This part is used to check for and store the session token if it is returned by the server.
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const authHeader = context.response.headers.get('vendure-auth-token')
    if (authHeader) {
      // If the auth token has been returned by the Vendure server, we store it in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, authHeader)
    }
    return response
  })
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    // If we have stored the authToken from a previous response, we attach it to all subsequent requests.
    setContext((request, operation) => {
      const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
      let headers: Record<string, string> = {}
      if (authToken) {
        headers.authorization = `Bearer ${authToken}`
      }
      return { headers }
    }),
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
})
