// @flow strict

import type {Node} from 'react';

import React from 'react';
import {Redirect} from 'react-router-dom';

import LoadingPage from 'components/shared/LoadingPage.react';
import ErrorPage from 'components/shared/ErrorPage.react';

import {useQuery} from '@apollo/client';
import {GET_CURRENT_OWNER} from 'services/apollo/queries';

type Props = $ReadOnly<{
  children: Node,
}>;

function RestaurantCreatedRedirect({children}: Props): Node {
  const {loading, error, data} = useQuery(GET_CURRENT_OWNER, {errorPolicy: 'all'});

  if (loading) return <LoadingPage />;
  if (error) {
    if (error.networkError) {
      return <ErrorPage>Error de autorización</ErrorPage>;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/restaurant/protected/new',
          }}
        />
      );
    }
  }

  if (data) {
    localStorage.setItem('owner', JSON.stringify(data.getCurrentRestaurantOwner));
  }

  return children;
}

export default RestaurantCreatedRedirect;
