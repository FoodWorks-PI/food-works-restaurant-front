// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import BASE_URL from 'services/config';

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
  uri: `${BASE_URL}/api/graphql`,
  }),
});
