// @flow strict

import React from 'react';
import type {Node} from 'react';
import {Card, CardContent, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';

const useStyles = makeStyles({
  card: {
    padding: '1rem',
    width: '500px',
    maxHeight: '75vh',
    zIndex: 10,
  },
  form: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  button: {
    width: '40%',
    margin: '20px 5px 0px 5px ',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = {
  restaurant: {
    name: string,
    description: string,
    cuisine: string,
  },
  address: string,
  handleChange: (e: SyntheticInputEvent<>) => void,
  nextStep: () => void,
  prevStep: () => void,
  setOpen: (value: boolean) => void,
};

function RestaurantAdressForm(props: Props): Node {
  console.log(props);
  const {address, handleChange} = props;
  const classes = useStyles();

  function handleAddressSearch(e) {
    e.preventDefault();
  }

  function continueForm(e) {
    e.preventDefault();
    const valid = address !== '';
    valid ? props.nextStep() : props.setOpen(true);
  }

  function previousForm(e) {
    e.preventDefault();
    props.prevStep();
  }

  return (
    <Card raised={true} className={classes.card}>
      <CardContent style={{height: '100%'}}>
        <Typography
          variant="h4"
          color="secondary"
          align="center"
          className={classes.title}
        >
          '{props.restaurant.name}'
        </Typography>
        <Typography
          gutterBottom
          display="block"
          variant="subtitle2"
          color="secondary"
          align="center"
        >
          Busca la direccion de tu restaurante
        </Typography>
        <div className={classes.form}>
          <TextField
            name="address"
            label="Dirección"
            color="primary"
            value={address}
            onChange={handleChange}
            required={true}
            margin="normal"
            type="search"
          />
          <div className={classes.buttons}>
            <Button className={classes.button} onClick={previousForm}>
              Regresar
            </Button>
            <Button className={classes.button} onClick={continueForm}>
              Continuar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RestaurantAdressForm;
