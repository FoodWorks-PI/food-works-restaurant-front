// @flow strict

import type {Node} from 'react';
import type {OwnerProfile} from 'constants/ResourcesTypes';

import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import Button from 'components/shared/Button.react';

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
  editOwner: (owner: OwnerProfile) => void,
  currentOwner: OwnerProfile,
};

function AccountEditOwnerForm({editOwner, currentOwner}: Props): Node {
  const classes = useStyles();
  const [owner, setOwner] = useState(currentOwner);

  function handleChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const valid = Object.values(owner).every((v) => v !== '');
    if (valid) editOwner(owner);
  }

  return (
    <FlexLayout className={classes.root} direction="vertical">
      <Typography variant="h6">Datos del dueño/a</Typography>
      <FlexLayout direction="vertical" className={classes.form} align="center">
        <TextInput
          label="Nombre"
          name="name"
          placeholder="Juan"
          value={owner.name}
          onChange={handleChange}
        />
        <TextInput
          label="Apellido"
          name="lastName"
          placeholder="Perez"
          value={owner.lastName}
          onChange={handleChange}
        />
        <TextInput
          label="Telefono"
          name="phone"
          placeholder="55 1478 52 70"
          value={owner.phone}
          onChange={handleChange}
        />
        <TextInput
          label="Correo Electronico"
          name="email"
          value={owner.email}
          disabled
        />
        <Button className={classes.button} onClick={handleSubmit}>
          Actualizar Dueño/a
        </Button>
      </FlexLayout>
    </FlexLayout>
  );
}

export default AccountEditOwnerForm;
