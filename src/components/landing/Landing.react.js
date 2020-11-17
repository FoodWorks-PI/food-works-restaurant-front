// @flow strict

import type {Node} from 'react';

import React, {useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';
import LoadingPage from 'components/shared/LoadingPage.react';

import {useDispatch, useSelector} from 'react-redux';
import {getSession} from 'stores/actions/authActions';

import background from 'assets/background.jpg';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    color: 'white',
  },
  buttons: {
    width: '50%',
  },
  anchor: {
    textDecoration: 'none',
    color: 'white',
  },
});

function Landing(): Node {
  const classes = useStyles();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(authState);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  if (authState.isFetching) {
    return <LoadingPage />;
  } else if (authState.session) {
    return (
      <Redirect
        to={{
          pathname: '/restaurant/protected',
        }}
      />
    );
  } else {
    return (
      <FlexLayout
        direction="vertical"
        align="center"
        justify="center"
        className={classes.root}
      >
        <Typography variant="h1" align="center">
          FOOD WORKS
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Salva comida y gana dinero
        </Typography>
        <FlexLayout justify="evenly" className={classes.buttons}>
          <Button onClick={(e) => console.log(e)}>
            <a
              href={`${process.env.REACT_APP_FOODWORKS_BASE_URL}/auth/registration?clientApp=${process.env.REACT_APP_FOODWORKS_BASE_URL}/restaurant/protected`}
              className={classes.anchor}
            >
              Regístrate
            </a>
          </Button>
          <Button onClick={(e) => console.log(e)}>
            <a
              href={`${process.env.REACT_APP_FOODWORKS_BASE_URL}/auth/login?clientApp=${process.env.REACT_APP_FOODWORKS_BASE_URL}/restaurant/protected`}
              className={classes.anchor}
            >
              Inicia Sesión
            </a>
          </Button>
        </FlexLayout>
      </FlexLayout>
    );
  }
}

export default Landing;
