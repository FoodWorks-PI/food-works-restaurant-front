// @flow strict

import {gql} from '@apollo/client';

export const GET_CURRENT_OWNER = gql`
  query getOwner {
    getCurrentRestaurantOwner {
      ID
      name
      email
      restaurant {
        ID
        name
      }
    }
  }
`;

export const GET_ALL_RESTAURANT_PRODUCTS = gql`
  query getAllProducts($input: ProductsFilterByRestaurantInput!) {
    getProductsByRestaurantID(input: $input) {
      ID
      name
      description
      tags
      isActive
      cost
    }
  }
`;
