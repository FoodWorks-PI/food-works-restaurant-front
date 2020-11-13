// @flow strict

import type {Node} from 'react';
import type {Order} from 'constants/ResourcesTypes';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

import FlexLayout from 'components/shared/FlexLayout.react';
import OrderCard from 'components/orders/OrderCard.react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '50%',
    overflowX: 'auto',
    padding: '5px 0 5px 0',
    margin: '10px 0 10px 0',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      height: 10,
      borderRadius: 12,
      backgroundColor: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 12,
      backgroundColor: 'hsl(0, 0%, 86%)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

type Props = {
  orders: Order[],
  children: Node,
};

function OrderRow({orders, children}: Props): Node {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
      {orders.length === 0 && (
        <Typography variant="h6" color="secondary">
          No tienes ordenes
        </Typography>
      )}
      <FlexLayout direction="horizontal" align="stretch" className={classes.root}>
        {orders.map((order) => (
          <OrderCard order={order} key={order.ID} />
        ))}
      </FlexLayout>
    </>
  );
}

export default OrderRow;
