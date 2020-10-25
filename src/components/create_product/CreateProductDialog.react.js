// @flow strict

import type {Node} from 'react';

import React from 'react';
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

const useStyles = makeStyles({
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
});

type Props = {
  isOpen: boolean,
  closeDialog: (e: SyntheticMouseEvent<>) => mixed,
};

function CreateProductDialog({isOpen, closeDialog}: Props): Node {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Agrega un nuevo producto a tu menú
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          Llena los datos para agregar un nuevo producto a tu restaurante
        </DialogContentText>
        <TextInput
          className={classes.input}
          label="Nombre del producto"
          type="text"
          placeholder="Tacos de canasta"
        />
        <TextInput
          className={classes.input}
          label="Descripción del producto"
          type="text"
          placeholder="Ricos tacos de canasta. ¡Para morirse!"
        />
        <TextInput
          className={classes.input}
          label="Precio Unitario"
          type="number"
          placeholder="50"
        />
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button onClick={closeDialog}>Crear</Button>
        <Button onClick={closeDialog}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateProductDialog;
