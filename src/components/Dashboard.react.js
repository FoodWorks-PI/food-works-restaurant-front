// @flow strict

import type {Node} from 'react';
import type {Owner, Order} from 'constants/ResourcesTypes';

import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

import ErrorPage from 'components/shared/ErrorPage.react';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import LoadingPage from 'components/shared/LoadingPage.react';
import OrderRow from 'components/orders/OrderRow.react';

import {useQuery} from '@apollo/client';
import {GET_ORDERS} from 'services/apollo/queries';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginLeft: 20,
    padding: '8px',
  },
  fab: {
    position: 'fixed',
    bottom: '5%',
    right: '5%',
    color: 'white',
  },
});

function Dashboard(): Node {
  const classes = useStyles();
  const {data, loading, error} = useQuery(GET_ORDERS);

  if (loading) return <LoadingPage />;

  if (error) {
    console.log(error);
    return <ErrorPage>Error con la API</ErrorPage>;
  }

  const activeOrders: Order[] = data.getRestaurantOrders.filter(
    (order) =>
      order.orderState !== 'COMPLETED' &&
      order.orderState !== 'CANCELLED' &&
      order.orderState !== 'ERROR',
  );
  const pastOrders: Order[] = data.getRestaurantOrders.filter(
    (order) =>
      order.orderState !== 'PENDING_PAYMENT' &&
      order.orderState !== 'PAID' &&
      order.orderState !== 'ERROR',
  );
  console.log(activeOrders);
  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout direction="vertical" className={classes.content}>
        <OrderRow orders={activeOrders}>Ordenes Activas</OrderRow>
        <OrderRow orders={pastOrders}>Ordenes Pasadas</OrderRow>
      </FlexLayout>
    </FlexLayout>
  );
}

export default Dashboard;
