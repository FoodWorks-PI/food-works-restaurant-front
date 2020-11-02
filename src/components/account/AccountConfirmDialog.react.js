// @flow strict

import type {Node} from 'react';

import React, {useState} from 'react';
import clsx from 'clsx';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '80%',
    margin: '3px auto',
  },
  content: {
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
  },
  buttonCancel: {
    fontSize: 12,
    backgroundColor: '#ccc',
  },
  buttonDelete: {
    fontSize: 12,
    backgroundColor: theme.palette.error.main,
  },
}));

type Props = {
  isOpen: boolean,
  closeDialog: (e: SyntheticMouseEvent<>) => mixed,
  deleteProduct: () => void,
  confirmationText: string,
};

function AccountConfirmDialog({
  isOpen,
  closeDialog,
  deleteProduct,
  confirmationText,
}: Props): Node {
  const classes = useStyles();
  const [input, setInput] = useState('');

  function handleSubmit() {
    if (input === confirmationText) {
      deleteProduct();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" color="error">
        Confirmar eliminación de datos
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          Ingresa el nombre de <strong>{confirmationText}</strong> para confirmar
        </DialogContentText>
        <TextInput
          name="name"
          label="Nombre de restaurante"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={classes.input}
        />
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button
          onClick={handleSubmit}
          className={clsx({
            [classes.buttonCancel]: confirmationText !== input,
            [classes.buttonDelete]: confirmationText === input,
          })}
        >
          Eliminar
        </Button>
        <Button onClick={closeDialog} className={classes.buttonCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountConfirmDialog;
