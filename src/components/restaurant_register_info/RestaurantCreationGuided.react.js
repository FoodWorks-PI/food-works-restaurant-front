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
import RestaurantConfirmation from './RestaurantConfirmation.react';
import Alert from 'components/shared/Alert.react';

import {useMutation} from '@apollo/client';
import {NEW_RESTAURANT_OWNER} from 'services/apollo/mutations';
import {useHistory} from 'react-router-dom';

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
    phone: '',
    bankNumber: '',
  },
  restaurant: {
    name: '',
    description: '',
    cuisine: '',
  },
};
const initialAddress = {
  streetLine: '',
  longitude: 0.0,
  latitude: 0.0,
};

function RestaurantCreationGuided(): Node {
  const [state, setState] = useState(initialState);
  const [address, setAddress] = useState(initialAddress);
  const [activeStep, setStep] = useState(0);
  const [alertOpen, setOpen] = useState(false);
  const classes = useStyles();

  const [createOwner] = useMutation(NEW_RESTAURANT_OWNER);
  let history = useHistory();

  function nextStep() {
    setStep((prevActiveStep) => prevActiveStep + 1);
  }
  function prevStep() {
    setStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleOwnerCreation(e) {
    e.preventDefault();
    console.log(state, address);
    createOwner({
      variables: {
        input: {
          name: state.owner.name,
          lastName: state.owner.lastName,
          phone: state.owner.lastName,
          banking: {bankAccount: state.owner.bankNumber},
          restaurant: {
            name: state.restaurant.name,
            address: {...address},
            description: state.restaurant.description,
            tags: [state.restaurant.cuisine],
          },
        },
      },
    })
      .then((result) => {
        console.log('Created owner successfully');
        console.log(result);
        history.push('/restaurant/protected/dashboard');
      })
      .catch((error) => {
        console.log('Error creating owner');
        console.log(error);
      });
  }

  function handleOwnerChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({
      ...prevState,
      owner: {...prevState.owner, [name]: value},
    }));
  }
  function handleRestaurantChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({
      ...prevState,
      restaurant: {...prevState.restaurant, [name]: value},
    }));
  }

  function handleStreetLineChange(e: SyntheticInputEvent<>) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  }

  function setCoords(latitude: number, longitude: number) {
    setAddress((prevAddress) => ({
      ...prevAddress,
      latitude,
      longitude,
    }));
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
            street={address.streetLine}
            setCoords={setCoords}
            handleChange={handleStreetLineChange}
          />
        );
      case 3: {
        return (
          <RestaurantConfirmation
            state={state}
            address={address}
            prevStep={prevStep}
            handleOwnerCreation={handleOwnerCreation}
          />
        );
      }
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

export default RestaurantCreationGuided;
