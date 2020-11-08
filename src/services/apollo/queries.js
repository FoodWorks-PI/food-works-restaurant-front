// @flow strict

import {gql} from '@apollo/client';

export const GET_CURRENT_OWNER = gql`
  query getOwner {
    getCurrentRestaurantOwner {
      ID
      name
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

export const GET_RESTAURANT = gql`
  query getRestaurant($input: ID!) {
    getRestaurantByID(input: $input) {
      ID
      name
      description
      tags
      address {
        latitude
        longitude
        streetLine
      }
    }
  }
`;

export const GET_CURRENT_COMPLETE_OWNER = gql`
  query getFullOwner {
    getCurrentRestaurantOwner {
      ID
      name
      email
      phone
      restaurant {
        ID
        name
        description
        tags
        address {
          latitude
          longitude
          streetLine
        }
        products {
          name
        }
      }
    }
  }
`;

export const TAG_AUTOCOMPLETE = gql`
  query getTags($input: String!) {
    autoCompleteTag(input: $input)
  }
`;
