// @flow strict

import type {Node} from 'react';
import type {Order} from 'constants/ResourcesTypes';

import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Paper} from '@material-ui/core';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '0 0 33.3333%',
    height: 200,
    margin: '0px 5px 0px 5px',
    padding: 8,
  },
  content: {
    height: '100%',
    width: '100%',
  },
  titleRow: {
    width: '100%',
    marginBottom: 15,
  },
  fullRow: {
    width: '100%',
  },
  total: {
    width: '100%',
    margin: '8px 0',
  },
  buttons: {
    width: '100%',
    flexGrow: 2,
    alignItems: 'flex-end',
  },
  completeButton: {
    backgroundColor: theme.palette.success.main,
    marginRight: 8,
    fontSize: 13,
  },
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    fontSize: 13,
  },
}));

type Props = {
  order: Order,
};

function OrderCard({order}: Props): Node {
  const classes = useStyles();

  function handleComplete() {
    console.log('OCMPLETE');
  }
  function handleCancel() {
    console.log('CANCEL');
  }

  function getButtons() {
    switch (order.orderState) {
      case 'COMPLETED':
        return (
          <Typography variant="body1" color="primary" gutterBottom>
            ORDEN COMPLETADA
          </Typography>
        );
      case 'PAID':
        return (
          <Button onClick={handleComplete} className={classes.completeButton}>
            Completar
          </Button>
        );
      case 'CANCELLED':
        return (
          <Typography variant="body1" color="error" gutterBottom>
            ORDEN CANCELADA
          </Typography>
        );
      case 'PENDING_PAYMENT':
        return (
          <>
            <Button onClick={handleComplete} className={classes.completeButton}>
              Completar
            </Button>
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancelar
            </Button>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Paper className={classes.root} elevation={3} square>
      <FlexLayout direction="vertical" className={classes.content}>
        <FlexLayout justify="between" align="center" className={classes.titleRow}>
          <Typography variant="h5">{order.customer.name}</Typography>
          <Typography variant="subtitle1">19:50</Typography>
        </FlexLayout>
        <FlexLayout className={classes.fullRow} direction="vertical">
          <Typography variant="subtitle2">
            <strong>Detalles</strong>
          </Typography>
          <FlexLayout justify="between" align="center" className={classes.fullRow}>
            <Typography variant="body1">
              {order.product.name} <strong>x{order.quantity}</strong>
            </Typography>
            <Typography variant="body1" color="secondary">
              ${order.product.cost / 100}
            </Typography>
          </FlexLayout>
        </FlexLayout>

        <FlexLayout align="center" justify="between" className={classes.buttons}>
          <FlexLayout align="center">{getButtons()}</FlexLayout>
          <Typography variant="h6" color="secondary" align="right">
            TOTAL: ${(order.product.cost / 100) * order.quantity}
          </Typography>
        </FlexLayout>
      </FlexLayout>
    </Paper>
  );
}

export default OrderCard;
