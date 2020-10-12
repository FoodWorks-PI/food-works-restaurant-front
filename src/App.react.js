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
import {GET_CURRENT_OWNER} from 'services/apollo/queries';
import {apiClient} from 'services/apollo/apollo';
import {kratos} from 'services/kratos';

import useNetworkState from 'hooks/useNetworkState';

import RestaurantCreationGuided from 'components/restaurant_register_info/RestaurantCreationGuided.react';

const client = apiClient;

function getSession() {
  kratos.whoami().then((result) => console.log(result));
}

function getOwner() {
  client
    .query({
      query: GET_CURRENT_OWNER,
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}

function RequestDemo() {
  return (
    <div>
      <button onClick={getSession}>Get Session</button>
      <button onClick={getOwner}>Get Current Owner</button>
    </div>
  );
}

function App() {
  const [isOnline, connectedAt] = useNetworkState();

  function PublicDemo() {
    return (
      <div>
        <a href="https://127.0.0.1:4455/auth/registration?clientApp=https://127.0.1:4455/restaurant/protected">
          Register
        </a>
        <a href="https://127.0.0.1:4455/auth/login?clientApp=https://127.0.0.1:4455/restaurant/protected">
          Login
        </a>
        <br></br>
        <RequestDemo />
      </div>
    );
  }

  function ProtectedDemo() {
    return (
      <div>
        <RequestDemo />
        <RestaurantCreationGuided />
      </div>
    );
  }

  function HomeDemo() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apiClient}>
        <Router>
          <Switch>
            <Route exact path="/restaurant" component={HomeDemo} />
            <Route path="/restaurant/public" component={PublicDemo} />
            <Route path="/restaurant/protected" component={ProtectedDemo} />
            <Route path="/restaurant/complete-profile">
              <RestaurantCreationGuided />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
