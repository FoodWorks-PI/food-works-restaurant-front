// @flow strict

import type {Node} from 'react';
import type {OwnerProfile} from 'constants/ResourcesTypes';

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
  owner: OwnerProfile,
};

function AccountDeleteOwner({owner}: Props): Node {
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
        Eliminar mi cuenta
      </Typography>
      <Typography variant="body2">
        Esta acción no podrá ser devuelta. Todos los datos asociados a tu cuenta serán
        eliminados.
      </Typography>
      <Button className={classes.button} onClick={handleOpen}>
        Eliminar Cuenta
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        closeDialog={handleClose}
        deleteProduct={handleDelete}
        confirmationText={owner.name}
      />
    </FlexLayout>
  );
}

export default AccountDeleteOwner;
