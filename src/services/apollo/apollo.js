// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apiClient = new ApolloClient({
  uri: 'https://127.0.0.1:4455/api/graphql',
  cache: new InMemoryCache(),
});
