// @flow strict

import React from 'react';
import type {Node} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    marginBottom: '30px',
    color: 'white',
  },
}));

function getSteps() {
  return ['Paso 1: Dueño', 'Paso 2: Restaurante', 'Paso 3: Dirección'];
}

type Props = {
  step: number,
};

function FormStepper(props: Props): Node {
  const classes = useStyles();
  const {step} = props;
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={step} alternativeLabel elevation={4}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default FormStepper;
