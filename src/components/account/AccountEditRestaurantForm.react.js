// @flow strict

import type {Node} from 'react';
import type {Restaurant} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';
import TagAutoComplete from 'components/shared/TagAutoComplete.react';

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
  tagsInput: {
    marginTop: 10,
    marginBottom: 5,
  },
});

type Props = {
  editRestaurant: (restaurant: Restaurant) => void,
  currentRestaurant: Restaurant,
  setAlertState: (alert: {isOpen: boolean, text: string, type?: ?string}) => void,
};

function AccountEditRestaurantForm({
  editRestaurant,
  currentRestaurant,
  setAlertState,
}: Props): Node {
  const classes = useStyles();
  const [position, posError, isFetching] = useInitialGeoPosition();
  const [restaurant, setRestaurant] = useState(currentRestaurant);

  function validPosition() {
    if (posError && !isFetching) {
      window.alert('Acepta los permisos de ubicación');
      return false;
    } else if (!isFetching) {
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

  function handleTags(newTags: string[]) {
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      tags: [...newTags],
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
    const valid =
      Object.values(restaurant).every((v) => v !== '') && restaurant.tags.length > 0;
    if (valid) {
      editRestaurant(restaurant);
    } else {
      setAlertState({
        isOpen: true,
        text: 'Llena todos los campos',
      });
    }
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
        <TagAutoComplete
          tags={restaurant.tags}
          setTags={handleTags}
          className={classes.tagsInput}
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
