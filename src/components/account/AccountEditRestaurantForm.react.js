// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

import useInitialGeoPosition from 'hooks/useInitialGeoPosition';

const useStyles = makeStyles({
  root: {
    width: '100.0%',
  },
  form: {
    width: '100.0%',
    padding: '0 1.5rem',
  },
  button: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

type Props = {
  editRestaurant: (restaurant: Restaurant) => void,
  currentRestaurant: Restaurant,
};

function AccountEditRestaurantForm({editRestaurant, currentRestaurant}: Props): Node {
  const classes = useStyles();
  const [position, posError, isFetching] = useInitialGeoPosition();
  const [restaurant, setRestaurant] = useState(currentRestaurant);

  function validPosition() {
    if (posError && !isFetching) {
      window.alert('Acepta los permisos de ubicación');
      return false;
    } else if (!isFetching) {
      console.log(position);
      return true;
    }
  }

  function handleChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    console.log(restaurant);
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  }

  function handleAddress(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      address: {
        ...prevRestaurant.address,
        [name]: value,
      },
    }));
  }

  function handleSubmit() {
    if (validPosition()) {
      setRestaurant((prevRestaurant) => ({
        ...prevRestaurant,
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
      }));
    }
    const valid = Object.values(restaurant).every((v) => v !== '');
    if (valid) editRestaurant(restaurant);
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography variant="h6">Datos del resturante</Typography>
      <FlexLayout direction="vertical" className={classes.form} align="center">
        <TextInput
          label="Nombre"
          name="name"
          placeholder="Mi restaurante"
          value={restaurant.name}
          onChange={handleChange}
        />
        <TextInput
          label="Descripción"
          name="description"
          placeholder="Antojos mexicanos"
          value={restaurant.description}
          onChange={handleChange}
        />
        <TextInput
          label="Tipo de Cocina"
          name="tags"
          placeholder="Mexicana"
          value={restaurant.tags[0]}
          onChange={handleChange}
        />
        <TextInput
          label="Calle"
          name="streetLine"
          placeholder="Calle Hidalgo"
          value={restaurant.address.streetLine}
          onChange={handleAddress}
        />
        <Button className={classes.button} onClick={handleSubmit}>
          Actualizar Restaurante
        </Button>
      </FlexLayout>
    </FlexLayout>
  );
}

export default AccountEditRestaurantForm;
