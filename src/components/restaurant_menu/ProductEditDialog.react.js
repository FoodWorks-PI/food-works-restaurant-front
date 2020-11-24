// @flow strict

import type {Node} from 'react';
import type {Product} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Alert from 'components/shared/Alert.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TagAutoComplete from 'components/shared/TagAutoComplete.react';

const useStyles = makeStyles({
  input: {
    width: '80% !important',
    margin: '3px auto',
  },
  inputNumber: {
    width: '30%',
    marginTop: '3px',
  },
  inputCheck: {
    width: '70%',
  },
  content: {
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
  },
  iconButton: {
    borderRadius: '50%',
    margin: 0,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#ccc',
  },
});

type Props = {
  isOpen: boolean,
  closeDialog: (e: SyntheticMouseEvent<>) => mixed,
  updateProduct: (data: Product) => void,
  currentProduct: Product,
};

function ProductEditDialog({
  isOpen,
  closeDialog,
  updateProduct,
  currentProduct,
}: Props): Node {
  const classes = useStyles();
  const [alertOpen, setAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [product, setProduct] = useState(currentProduct);

  function handleChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
  function handleTags(newTags: string[]) {
    setProduct((prevProduct) => ({...prevProduct, tags: newTags}));
  }

  function handleSubmit() {
    const valid =
      Object.values(product).every((v) => v !== '') && product.tags.length > 0;
    if (!valid) {
      setAlertText('Llena todos los campos');
      setAlert(true);
      return;
    } else {
      //Change to cents
      product.cost *= 100;
      updateProduct(product);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Alert severity="warning" open={alertOpen} setOpen={setAlert}>
        {alertText}
      </Alert>
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
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Tacos de canasta"
        />
        <TextInput
          className={classes.input}
          label="Descripción del producto"
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Ricos tacos de canasta. ¡Para morirse!"
        />
        <FlexLayout className={classes.input} align="center">
          <TextField
            className={classes.inputNumber}
            variant="outlined"
            label="Precio Unitario"
            type="number"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            placeholder="50"
            size="small"
            InputProps={{inputProps: {min: 0}}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FlexLayout className={classes.inputCheck} justify="end">
            <FlexLayout direction="vertical" align="end">
              <Typography variant="body2">Disponibilidad del producto</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.active}
                    onChange={handleChange}
                    name="active"
                    color="primary"
                  />
                }
                label="Activo"
              />
            </FlexLayout>
          </FlexLayout>
        </FlexLayout>
        <TagAutoComplete
          tags={product.tags}
          setTags={handleTags}
          className={classes.input}
        />
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button onClick={handleSubmit}>Actualizar</Button>
        <Button onClick={closeDialog} className={classes.button}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductEditDialog;
