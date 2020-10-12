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
  imageInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  imageLabel: {
    fontSize: '1.25em',
    margin: '10px 0 10px 0',
    width: '100%',
    color: 'black',
    borderBottom: '1px solid #7EA8EF',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = {
  owner: {
    name: string,
    lastName: string,
    phone: string,
    bankNumber: string,
  },
  values: {
    name: string,
    description: string,
    cuisine: string,
  },
  handleChange: (e: SyntheticInputEvent<>) => void,
  nextStep: () => void,
  prevStep: () => void,
  setOpen: (value: boolean) => void,
};

function RestaurantDataForm(props: Props): Node {
  const classes = useStyles();
  const {values, handleChange} = props;

  function continueForm(e) {
    e.preventDefault();
    const valid = Object.values(values).every((v) => v !== '');
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
          Hola, {props.owner.name} {props.owner.lastName}
        </Typography>
        <Typography
          gutterBottom
          display="block"
          variant="caption"
          color="secondary"
          align="center"
        >
          Completa la información de tu restaurante
        </Typography>
        <div className={classes.form}>
          <TextField
            name="name"
            label="Nombre del restaurante"
            color="primary"
            value={values.name}
            onChange={handleChange}
            required={true}
            margin="normal"
          />
          <TextField
            name="cuisine"
            label="Tipo de Cocina"
            color="primary"
            value={values.cuisine}
            onChange={handleChange}
            required={true}
            margin="normal"
          />
          <TextField
            name="description"
            label="Descripción"
            multiline
            rowsMax={5}
            color="primary"
            value={values.description}
            onChange={handleChange}
            required={true}
            margin="normal"
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

export default RestaurantDataForm;
