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
import {AddCircleRounded, RemoveCircleRounded} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import Alert from 'components/shared/Alert.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles({
  input: {
    width: '80%',
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

  function addField(e) {
    e.preventDefault();
    if (product.tags.length >= 5) {
      setAlertText('No más de tres tags');
      setAlert(true);
      return;
    }
    let temp = product.tags.concat(['']);
    setProduct((prevProduct) => ({...prevProduct, tags: temp}));
  }

  function removeField(e) {
    e.preventDefault();
    if (product.tags.length > 1) {
      let temp = product.tags.slice(0, -1);
      setProduct((prevProduct) => ({...prevProduct, tags: temp}));
    }
  }

  function handleChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
  function arrayChange(e, ndx) {
    const {name, value} = e.target;
    let tags = [...product[name]];
    tags[ndx] = value;
    setProduct((prevProduct) => ({...prevProduct, [name]: tags}));
  }

  function handleSubmit() {
    const valid = Object.values(product).every((v) => v !== '');
    if (!valid) {
      setAlertText('Llena todos los campos');
      setAlert(true);
      return;
    } else {
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
        <FlexLayout direction="vertical" className={classes.input}>
          <FlexLayout>
            <Typography>Ingresa categorías para tu producto</Typography>
            <AddCircleRounded color="primary" onClick={addField} />
            <RemoveCircleRounded color="secondary" onClick={removeField} />
          </FlexLayout>
          {product.tags.map((tag, ndx) => (
            <TextInput
              key={ndx}
              label="Tag"
              type="text"
              name="tags"
              value={tag}
              onChange={(e) => arrayChange(e, ndx)}
              placeholder="Mexicana"
            />
          ))}
        </FlexLayout>
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
