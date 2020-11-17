// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apiClient = new ApolloClient({
  uri: `${process.env.REACT_APP_FOODWORKS_BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
});
