// @flow strict

import React, {useState} from 'react';
import type {Node} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Footer from 'components/shared/Footer.react';
import Navbar from 'components/shared/Navbar.react';
import OwnerDataForm from 'components/forms/OwnerDataForm.react';
import RestaurantDataForm from 'components/forms/RestaurantDataForm.react';
import RestaurantAddressForm from 'components/forms/ResturantAddressForm.react';
import FormStepper from 'components/restaurant_register_info/FormStepper.react';
import Alert from 'components/shared/Alert.react';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const initialState = {
  owner: {
    name: '',
    lastName: '',
    number: '',
    bankNumber: '',
  },
  restaurant: {
    name: '',
    description: '',
    cuisine: '',
  },
  address: '',
};

function RestaurantInfo(): Node {
  const [state, setState] = useState(initialState);
  const [activeStep, setStep] = useState(0);
  const [alertOpen, setOpen] = useState(false);
  const classes = useStyles();

  function nextStep() {
    setStep((prevActiveStep) => prevActiveStep + 1);
  }
  function prevStep() {
    setStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleOwnerChange(e) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({
      ...prevState,
      owner: {...prevState.owner, [name]: value},
    }));
  }
  function handleRestaurantChange(e) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({
      ...prevState,
      restaurant: {...prevState.restaurant, [name]: value},
    }));
  }
  function handleAddressChange(e) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({...prevState, [name]: value}));
  }

  function getForm() {
    switch (activeStep) {
      case 0:
        return (
          <OwnerDataForm
            nextStep={nextStep}
            handleChange={handleOwnerChange}
            values={state.owner}
            setOpen={setOpen}
          />
        );
      case 1:
        return (
          <RestaurantDataForm
            owner={state.owner}
            nextStep={nextStep}
            prevStep={prevStep}
            setOpen={setOpen}
            handleChange={handleRestaurantChange}
            values={state.restaurant}
          />
        );
      case 2:
        return (
          <RestaurantAddressForm
            restaurant={state.restaurant}
            nextStep={nextStep}
            prevStep={prevStep}
            setOpen={setOpen}
            handleChange={handleAddressChange}
            address={state.address}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <Alert severity="warning" open={alertOpen} setOpen={setOpen}>
        Llena todos los datos
      </Alert>
      <div className={classes.content}>
        <FormStepper step={activeStep} />
        {getForm()}
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantInfo;
