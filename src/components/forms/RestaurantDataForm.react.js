// @flow strict

import type {Node} from 'react';

import React from 'react';

import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Button from 'components/shared/Button.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import TextInput from 'components/shared/TextInput.react';
import TagAutoComplete from 'components/shared/TagAutoComplete.react';

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
  input: {
    margin: '5px 0 5px 0',
  },
  padding: {
    padding: '1.2em',
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
    tags: string[],
  },
  handleChange: (e: SyntheticInputEvent<>) => mixed,
  nextStep: () => void,
  prevStep: () => void,
  setOpen: (value: boolean) => void,
  handleTags: (tags: string[]) => void,
};

function RestaurantDataForm(props: Props): Node {
  const classes = useStyles();
  const {values, handleChange} = props;

  function continueForm(e) {
    e.preventDefault();
    const valid = Object.values(values).every((v) => v !== '') && values.tags.length > 0;
    valid ? props.nextStep() : props.setOpen(true);
  }

  function previousForm(e) {
    e.preventDefault();
    props.prevStep();
  }

  function setTags(tags: string[]) {
    props.handleTags(tags);
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
        <FlexLayout
          direction="vertical"
          justify="center"
          align="center"
          className={classes.padding}
        >
          <TextInput
            name="name"
            label="Nombre del restaurante"
            value={values.name}
            onChange={handleChange}
            className={classes.input}
          />
          <TagAutoComplete tags={values.tags} setTags={setTags} />
          <TextInput
            name="description"
            label="Descripción"
            color="primary"
            value={values.description}
            onChange={handleChange}
            className={classes.input}
          />
        </FlexLayout>
        <FlexLayout justify="center" direction="horizontal">
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

export default RestaurantDataForm;
