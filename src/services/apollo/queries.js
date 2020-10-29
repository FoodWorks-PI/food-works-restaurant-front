// @flow strict

import {gql} from '@apollo/client';

export const GET_CURRENT_OWNER = gql`
  query getOwner {
    getCurrentRestaurantOwner {
      name
      email
      phone
      banking {
        bankAccount
      }
    }
  }
`;
