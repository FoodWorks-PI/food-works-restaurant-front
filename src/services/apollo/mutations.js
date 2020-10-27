// @flow strict

import {gql} from '@apollo/client';

export const NEW_RESTAURANT_OWNER = gql`
  mutation CreateRestaurantOwner($input: RegisterRestaurantOwnerInput!) {
    createRestaurantOwnerProfile(input: $input)
  }
`;

export const NEW_PRODUCT = gql`
  mutation NewProduct($input: RegisterProductInput!) {
    createProduct(input: $input)
  }
`;
