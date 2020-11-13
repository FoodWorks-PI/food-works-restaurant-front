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

function RestaurantNewWrapper({children}: Props): Node {
  const {loading, error, data} = useQuery(GET_CURRENT_OWNER, {errorPolicy: 'all'});

  if (loading) return <LoadingPage />;
  if (error) {
    if (error.networkError) {
      return <ErrorPage>Error de autorización</ErrorPage>;
    }
  }

  if (data) {
    return (
      <Redirect
        to={{
          pathname: '/restaurant/protected',
        }}
      />
    );
  }

  return children;
}

export default RestaurantNewWrapper;
