// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/ResourcesTypes';

import React, {useState} from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';

import ConfirmDialog from 'components/account/AccountConfirmDialog.react';

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

type Props = {
  restaurant: Restaurant,
};

function AccountDeleteRestaurant({restaurant}: Props): Node {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  function handleDelete() {
    console.log('Delete');
  }

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
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
      <Button className={classes.button} onClick={handleOpen}>
        Eliminar Restaurante
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        closeDialog={handleClose}
        deleteProduct={handleDelete}
        confirmationText={restaurant.name}
      />
    </FlexLayout>
  );
}

export default AccountDeleteRestaurant;
