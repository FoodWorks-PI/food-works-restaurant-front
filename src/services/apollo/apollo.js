// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({uri: 'https://127.0.0.1:4455/api/graphql'}),
});
