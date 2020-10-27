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

export const TOGGLE_PRODUCT_STATUS = gql`
  mutation ToggleStatus($input: ID!) {
    toggleProductStatus(input: $input)
  }
`;
