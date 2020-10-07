// @flow strict

import React from 'react';
import {
  BrowserRouter as Router,
  Route, // for later
  Switch,
} from 'react-router-dom';

import {ThemeProvider, CssBaseline, Typography} from '@material-ui/core';
import {theme} from 'shared/theme';

import {ApolloProvider} from '@apollo/client';
import {apiClient, GET_CURRENT_USER} from 'services/apollo';
import {kratos} from 'services/kratos';

import useNetworkState from 'hooks/useNetworkState';

import RestaurantInfo from 'components/restaurant_register_info/RestaurantInfo.react';

function App() {
  const [isOnline, connectedAt] = useNetworkState();
  const client = apiClient;

  function getSession() {
    kratos.whoami().then((result) => console.log(result));
  }

  function getUser() {
    client
      .query({
        query: GET_CURRENT_USER,
      })
      .then((result) => console.log(result));
  }

  function RequestDemo() {
    return (
      <div>
        <button onClick={getSession}>Get Session</button>
        <button onClick={getUser}>Get User</button>
      </div>
    );
  }

  function PublicDemo() {
    return (
      <div>
        <a href="https://127.0.0.1:4455/auth/registration?clientApp=https://127.0.1:4455/customer/protected">
          Register
        </a>
        <a href="https://127.0.0.1:4455/auth/login?clientApp=https://127.0.0.1:4455/customer/protected">
          Login
        </a>
        <RequestDemo />
      </div>
    );
  }

  function ProtectedDemo() {
    return (
      <div>
        <RequestDemo />
      </div>
    );
  }

  function HomeDemo() {
    return (
      <header className="App-header">
        <Typography variant="h2" align="center" color="primary">
          FOOD WORKS
        </Typography>
        <p>{isOnline ? 'Connected' : 'Disconnected'}</p>
        {isOnline ? connectedAt?.toDateString() : null}
      </header>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apiClient}>
        <Router>
          <Switch>
            <Route path="/home" component={HomeDemo} />
            <Route path="/public" component={PublicDemo} />
            <Route path="/customer/public" component={PublicDemo} />
            <Route path="/customer/protected" component={ProtectedDemo} />
            <Route path="/restaurant/complete-profile">
              <RestaurantInfo />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
