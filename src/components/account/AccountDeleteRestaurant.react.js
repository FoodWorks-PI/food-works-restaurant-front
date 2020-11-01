// @flow strict

import type {Node} from 'react';

import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100.0%',
    padding: '0 1.5rem',
  },
  button: {
    fontSize: 12,
    alignSelf: 'flex-end',
    backgroundColor: theme.palette.error.main,
  },
}));

function AccountDeleteRestaurant(): Node {
  const classes = useStyles();

  function handleDelete() {
    console.log('Delete');
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography variant="h6" color="error">
        Eliminar mi restaurante
      </Typography>
      <Typography variant="body2">
        Esta acción no podrá ser devuelta. Los productos y ordenes asociadas a este
        restaurante serán eliminados también.
      </Typography>
      <Button className={classes.button} onClick={handleDelete}>
        Eliminar Restaurante
      </Button>
    </FlexLayout>
  );
}

export default AccountDeleteRestaurant;
