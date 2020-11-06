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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($input: ID!) {
    deleteProduct(input: $input)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input)
  }
`;

export const UPDATE_RESTAURANT = gql`
  mutation UpdateRestaurant($input: RegisterRestaurantInput!) {
    updateRestaurant(input: $input)
  }
`;

export const UPDATE_OWNER = gql`
  mutation UpdateRestaurant($input: UpdateRestaurantOwnerInput!) {
    updateRestaurantOwnerProfile(input: $input)
  }
`;
