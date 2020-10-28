// @flow strict

import type {Node} from 'react';

import React from 'react';
import {Redirect} from 'react-router-dom';

import LoadingPage from 'components/shared/LoadingPage.react';
import RestaurantCreationGuided from 'components/restaurant_register_info/RestaurantCreationGuided.react';

import {useQuery} from '@apollo/client';
import {GET_CURRENT_OWNER} from 'services/apollo/queries';

function RestaurantCreatedRedirect(): Node {
  const {loading, error, data} = useQuery(GET_CURRENT_OWNER);

  if (loading) return <LoadingPage />;
  if (error) return <RestaurantCreationGuided />;

  if (data) {
    localStorage.setItem('owner', JSON.stringify(data.getCurrentRestaurantOwner));
  }

  return (
    <Redirect
      to={{
        pathname: '/restaurant/protected/dashboard',
      }}
    />
  );
}

export default RestaurantCreatedRedirect;
