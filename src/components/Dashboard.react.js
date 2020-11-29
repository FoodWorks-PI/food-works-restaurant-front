// @flow strict

import type {Node} from 'react';
import type {Order} from 'constants/ResourcesTypes';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import ErrorPage from 'components/shared/ErrorPage.react';
import Sidebar from 'components/shared/Sidebar.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import LoadingPage from 'components/shared/LoadingPage.react';
import OrderRow from 'components/orders/OrderRow.react';

import {useQuery, useMutation} from '@apollo/client';
import {GET_ORDERS} from 'services/apollo/queries';
import {UPDATE_ORDER} from 'services/apollo/mutations';

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
  const {data, loading, error, refetch} = useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 10000,
  });
  const [updateOrder] = useMutation(UPDATE_ORDER);

  if (loading) return <LoadingPage />;

  if (error) {
    console.log(error);
    return <ErrorPage>Error con la API</ErrorPage>;
  }

  function handleUpdate(id: number, state: string) {
    console.log(id, state);
    updateOrder({
      variables: {
        input: {
          orderID: id,
          orderState: state,
        },
      },
    })
      .then((result) => {
        refetch();
      })
      .catch((error) => console.log(error));
  }

  const activeOrders: Order[] = data.getRestaurantOrders.filter(
    (order) =>
      order.orderState !== 'COMPLETED' &&
      order.orderState !== 'CANCELLED' &&
      order.orderState !== 'ERROR',
  );
  activeOrders.sort((a, b) => b.updatedAt - a.updatedAt);
  const pastOrders: Order[] = data.getRestaurantOrders.filter(
    (order) =>
      order.orderState !== 'PENDING_PAYMENT' &&
      order.orderState !== 'PAID' &&
      order.orderState !== 'ERROR',
  );
  pastOrders.sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <FlexLayout>
      <Sidebar />
      <FlexLayout direction="vertical" className={classes.content}>
        <OrderRow orders={activeOrders} updateOrder={handleUpdate}>
          Ordenes Activas
        </OrderRow>
        <OrderRow orders={pastOrders} updateOrder={handleUpdate}>
          Ordenes Pasadas
        </OrderRow>
      </FlexLayout>
    </FlexLayout>
  );
}

export default Dashboard;
