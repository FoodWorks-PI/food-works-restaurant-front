// @flow strict

import type {Node} from 'react';

import React, {useEffect} from 'react';

import {Typography} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';
import ErrorPage from 'components/shared/ErrorPage.react';
import LoadingPage from 'components/shared/LoadingPage.react';

import {useDispatch, useSelector} from 'react-redux';
import {getSession} from 'stores/actions/authActions';

function Landing(): Node {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(authState);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  if (authState.isFetching) {
    return <LoadingPage />;
  } else if (authState.hasError) {
    return <ErrorPage>Error obteniendo sesión</ErrorPage>;
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
      <FlexLayout direction="vertical" align="center">
        <Typography variant="h2" align="center" color="primary">
          FOOD WORKS - Restaurant
        </Typography>
        <Button onClick={(e) => console.log(e)}>
          <a href="https://127.0.0.1:4455/auth/registration?clientApp=https://127.0.1:4455/restaurant/protected">
            Register
          </a>
        </Button>
        <Button onClick={(e) => console.log(e)}>
          <a href="https://127.0.0.1:4455/auth/login?clientApp=https://127.0.0.1:4455/restaurant/protected">
            Login
          </a>
        </Button>
      </FlexLayout>
    );
  }
}

export default Landing;
