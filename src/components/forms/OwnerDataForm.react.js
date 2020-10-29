// @flow strict

import React from 'react';
import type {Node} from 'react';

import {Card, CardContent, Typography} from '@material-ui/core';
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
    width: '50%',
    marginTop: '20px',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 'bold',
  },
  padding: {
    padding: '1.2em',
  },
  input: {
    margin: '5px 0 5px 0',
  },
});

type Props = {
  values: {
    name: string,
    lastName: string,
    phone: string,
    bankNumber: string,
  },
  handleChange: (e: SyntheticInputEvent<>) => mixed,
  nextStep: () => void,
  setOpen: (value: boolean) => void,
};

function OwnerDataForm(props: Props): Node {
  const classes = useStyles();
  const {values, handleChange} = props;

  function continueForm(e) {
    e.preventDefault();
    const valid = Object.values(values).every((v) => v !== '');
    valid ? props.nextStep() : props.setOpen(true);
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
          Ingresa tus datos
        </Typography>
        <Typography
          gutterBottom
          display="block"
          variant="caption"
          color="secondary"
          align="center"
        >
          Información del dueño o admnistrador
        </Typography>
        <FlexLayout
          direction="vertical"
          align="center"
          justify="center"
          className={classes.padding}
        >
          <TextInput
            name="name"
            label="Nombre"
            value={values.name}
            onChange={handleChange}
            className={classes.input}
          />
          <TextInput
            name="lastName"
            label="Apellido"
            value={values.lastName}
            onChange={handleChange}
            className={classes.input}
          />
          <TextInput
            type="number"
            name="phone"
            label="Telefono"
            value={values.phone}
            onChange={handleChange}
            className={classes.input}
          />
          <TextInput
            name="bankNumber"
            label="CLABE bancaria"
            value={values.bankNumber}
            onChange={handleChange}
            className={classes.input}
          />
          <Button className={classes.button} onClick={continueForm}>
            Continuar
          </Button>
        </FlexLayout>
      </CardContent>
    </Card>
  );
}

export default OwnerDataForm;
