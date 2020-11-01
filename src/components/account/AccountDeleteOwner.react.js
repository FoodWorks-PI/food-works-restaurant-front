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

function AccountDeleteOwner(): Node {
  const classes = useStyles();

  function handleDelete() {
    console.log('Delete');
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography variant="h6" color="error">
        Eliminar mi cuenta
      </Typography>
      <Typography variant="body2">
        Esta acción no podrá ser devuelta. Todos los datos asociados a tu cuenta serán
        eliminados.
      </Typography>
      <Button className={classes.button} onClick={handleDelete}>
        Eliminar Cuenta
      </Button>
    </FlexLayout>
  );
}

export default AccountDeleteOwner;
