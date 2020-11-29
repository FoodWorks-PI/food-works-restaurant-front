// @flow strict

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({uri: `${process.env.REACT_APP_FOODWORKS_BASE_URL}/api/graphql`}),
});
