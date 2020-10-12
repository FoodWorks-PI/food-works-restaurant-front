// @flow strict

import React from 'react';
import type {Node} from 'react';
import {Card, CardContent, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';

const useStyles = makeStyles({
  card: {
    padding: '1rem',
    width: '500px',
    maxHeight: '75vh',
    zIndex: 10,
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
  padding: {
    padding: '1.2em',
  },
  input: {
    margin: '5px 0 5px 0',
  },
});

type Props = {
  restaurant: {
    name: string,
    description: string,
    cuisine: string,
  },
  address: {
    latitude: number,
    longitude: number,
    streetLine: string,
  },
  handleChange: (e: SyntheticInputEvent<>) => mixed,
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
        <FlexLayout direction="vertical" justify="center" className={classes.padding}>
          <TextInput
            name="address"
            label="Dirección"
            value={address.streetLine}
            onChange={handleChange}
            type="text"
          />
        </FlexLayout>
        <FlexLayout direction="horizontal" justify="center">
          <Button className={classes.button} onClick={previousForm}>
            Regresar
          </Button>
          <Button className={classes.button} onClick={continueForm}>
            Continuar
          </Button>
        </FlexLayout>
      </CardContent>
    </Card>
  );
}

export default RestaurantAdressForm;
