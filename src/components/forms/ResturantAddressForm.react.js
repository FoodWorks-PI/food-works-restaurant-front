// @flow strict

import React, {useState} from 'react';
import type {Node} from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';

import useInitialGeoPosition from 'hooks/useInitialGeoPosition';

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
  street: string,
  handleChange: (e: SyntheticInputEvent<>) => mixed,
  setCoords: (latitude: number, longitude: number) => void,
  nextStep: () => void,
  prevStep: () => void,
  setOpen: (value: boolean) => void,
};

function RestaurantAdressForm(props: Props): Node {
  const {handleChange, street, setCoords} = props;
  const classes = useStyles();
  const [position, posError, isFetching] = useInitialGeoPosition();

  function continueForm(e) {
    e.preventDefault();
    if (street !== '' && position) {
      props.nextStep();
      setCoords(position.coords.latitude, position.coords.longitude);
    } else if (posError) {
      props.setOpen(true);
      console.log(posError);
    } else {
      props.setOpen(true);
    }
  }

  function previousForm(e) {
    e.preventDefault();
    props.prevStep();
  }

  if (posError && !isFetching) {
    window.alert('Acepta los permisos de ubicacion');
  } else if (!isFetching) {
    console.log(position);
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
          Acepta los permisos de ubicacion e ingresa tu calle
        </Typography>
        <FlexLayout direction="vertical" justify="center" className={classes.padding}>
          <TextInput
            name="streetLine"
            placeholder="Calle Hidalgo"
            label="Nombre de la calle"
            value={street}
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
