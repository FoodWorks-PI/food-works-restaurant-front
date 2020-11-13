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
  query getProducts {
    getCurrentRestaurantOwner {
      restaurant {
        ID
        products {
          ID
          name
          description
          active
          tags
          cost
        }
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

export const GET_ORDERS = gql`
  query getOrders {
    getRestaurantOrders {
      ID
      quantity
      orderState
      updatedAt
      product {
        name
        cost
      }
      customer {
        name
      }
    }
  }
`;
