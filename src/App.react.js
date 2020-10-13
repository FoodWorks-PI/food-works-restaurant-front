// @flow strict

import type {Node} from 'react';

import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route, // for later
  Switch,
  Redirect,
} from 'react-router-dom';

import {ThemeProvider, CssBaseline, Typography} from '@material-ui/core';
import {theme} from 'shared/theme';

import {ApolloProvider} from '@apollo/client';
import {GET_CURRENT_OWNER} from 'services/apollo/queries';
import {apiClient} from 'services/apollo/apollo';
import {kratos} from 'services/kratos';

import useNetworkState from 'hooks/useNetworkState';

import RestaurantCreationGuided from 'components/restaurant_register_info/RestaurantCreationGuided.react';
import FlexLayout from 'components/shared/FlexLayout.react';
import Button from 'components/shared/Button.react';

const client = apiClient;

type Owner = {
  name: string,
  lastName: string,
  phone: string,
  email: string,
  banking: {
    bankNumber: string,
  },
};

type Session = {
  authenticatedAt: string,
  expiresAt: string,
  identity: {
    id: string,
    verifiableAddresses: [
      {
        verified: boolean,
        value: string,
      },
    ],
  },
};

function getOwner() {
  return client.query({
    query: GET_CURRENT_OWNER,
  });
}

function App(): Node {
  const [isOnline, connectedAt] = useNetworkState();
  const [currentOwner, setOwner] = useState<?Owner>(undefined);
  const [activeSession, setSession] = useState<?Session>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    kratos
      .whoami()
      .then((result) => {
        console.log(result);
        setSession(result.body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    return function cleanup() {
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    async function getCurrentOwner() {
      try {
        const owner = await getOwner();
        setOwner(owner.data.getCurrentRestaurantOwner);
        setLoading(false);
      } catch (e) {
        console.error('error getting owner', e);
        setLoading(false);
      }
    }
    getCurrentOwner();
    return function cleanup() {
      setLoading(true);
    };
  }, []);

  function PublicDemo() {
    return (
      <FlexLayout justify="around">
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

  function ProtectedDemo() {
    if (isLoading) {
      return (
        <Typography variant="h2" align="center" color="primary">
          CARGANDO...
        </Typography>
      );
    } else if (currentOwner) {
      return <Redirect to="/restaurant/dashboard" />;
    } else if (!isLoading && !currentOwner) {
      return <RestaurantCreationGuided />;
    } else {
      return <h1>error</h1>;
    }
  }

  function Dashboard() {
    const verified = activeSession?.identity?.verifiableAddresses[0].verified;
    return (
      <div>
        <Typography variant="h2" align="center" color="primary">
          FOOD WORKS - HOME
        </Typography>
        <Typography variant="body1" align="center" color="secondary">
          Owner, {currentOwner?.name} {currentOwner?.phone}
          <br />
          Email, {currentOwner?.email}
        </Typography>
        <Typography variant="h5" align="center" color="secondary">
          {verified
            ? 'Tu correo ha sido verificado'
            : 'Verifica tu correo antes de continuar'}
        </Typography>
      </div>
    );
  }

  function HomeDemo() {
    if (isLoading) {
      return (
        <Typography variant="h2" align="center" color="primary">
          CARGANDO...
        </Typography>
      );
    } else if (activeSession) {
      return <Redirect to="/restaurant/protected" />;
    } else if (!isLoading && !activeSession) {
      return <Redirect to="/restaurant/public" />;
    } else {
      return (
        <header className="App-header">
          <Typography variant="h2" align="center" color="primary">
            FOOD WORKS - Restaurant
          </Typography>
          <p>{isOnline ? 'Connected' : 'Disconnected'}</p>
          {isOnline ? connectedAt?.toDateString() : null}
        </header>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apiClient}>
        <Router>
          <Switch>
            <Route exact path="/restaurant" component={HomeDemo} />
            <Route path="/restaurant/public" component={PublicDemo} />
            <Route path="/restaurant/protected" component={ProtectedDemo} />
            <Route path="/restaurant/dashboard" component={Dashboard} />
            <Route path="/restaurant/forms" component={RestaurantCreationGuided} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
