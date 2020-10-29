// @flow strict

import React from 'react';
import type {Node} from 'react';
import Button from 'components/shared/Button.react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    padding: '1rem',
    width: '500px',
    maxHeight: '70vh',
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
  state: {
    owner: {
      name: string,
      lastName: string,
      phone: string,
      bankNumber: string,
    },
    restaurant: {
      name: string,
      description: string,
      cuisine: string,
    },
  },
  address: {
    longitude: number,
    latitude: number,
    streetLine: string,
  },
  handleOwnerCreation: (e: SyntheticMouseEvent<>) => void,
  prevStep: () => void,
};

function RestaurantConfirmation({
  state,
  address,
  handleOwnerCreation,
  prevStep,
}: Props): Node {
  const classes = useStyles();

  return (
    <Card raised={true} className={classes.card}>
      <CardContent style={{height: '100%'}}>
        <Typography
          variant="h4"
          color="secondary"
          align="center"
          className={classes.title}
        >
          Confirma los datos
        </Typography>
        <div className={classes.form}>
          <Typography display="block" variant="h5" color="primary" align="center">
            Dueño/a
          </Typography>
          <Typography display="block" variant="h6" color="secondary">
            {state.owner.name} {state.owner.lastName}
          </Typography>
          <Typography display="block" variant="body2" color="secondary">
            {state.owner.phone}
          </Typography>
          <Typography display="block" variant="body2" color="secondary">
            {state.owner.bankNumber}
          </Typography>
          <Typography display="block" variant="h5" color="primary" align="center">
            Restaurante
          </Typography>
          <Typography display="block" variant="h6" color="secondary">
            {state.restaurant.name}
          </Typography>
          <Typography display="block" variant="body2" color="secondary">
            {state.restaurant.cuisine}
          </Typography>
          <Typography display="block" variant="body2" color="secondary">
            {state.restaurant.description}
          </Typography>
          <Typography display="block" variant="body2" color="secondary">
            {address.streetLine}
          </Typography>
          <div className={classes.buttons}>
            <Button onClick={prevStep} className={classes.button}>
              Regresar
            </Button>
            <Button onClick={handleOwnerCreation} className={classes.button}>
              Enviar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RestaurantConfirmation;
