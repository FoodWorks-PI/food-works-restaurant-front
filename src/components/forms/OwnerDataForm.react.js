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
    alignItems: 'center',
  },
  button: {
    width: '50%',
    marginTop: '20px',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 'bold',
  },
});

type Props = {
  values: {
    name: string,
    lastName: string,
    phone: string,
    bankNumber: string,
  },
  handleChange: (e: SyntheticInputEvent<>) => void,
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
        <div className={classes.form}>
          <TextField
            name="name"
            label="Nombre"
            color="primary"
            value={values.name}
            onChange={handleChange}
            margin="normal"
            required={true}
          />
          <TextField
            name="lastName"
            label="Apellido"
            color="primary"
            value={values.lastName}
            onChange={handleChange}
            margin="normal"
            required={true}
          />
          <TextField
            type="number"
            name="phone"
            label="Telefono"
            color="primary"
            value={values.phone}
            onChange={handleChange}
            required={true}
            margin="normal"
          />
          <TextField
            name="bankNumber"
            label="CLABE bancaria"
            color="primary"
            value={values.bankNumber}
            onChange={handleChange}
            required={true}
            margin="normal"
          />
          <Button className={classes.button} onClick={continueForm}>
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OwnerDataForm;
