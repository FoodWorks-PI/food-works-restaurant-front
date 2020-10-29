// @flow strict

import type {Node} from 'react';

import React from 'react';
import {
  BrowserRouter as Router,
  Route, // for later
  Switch,
} from 'react-router-dom';

import {ThemeProvider, CssBaseline} from '@material-ui/core';
import {theme} from 'shared/theme';

import {ApolloProvider} from '@apollo/client';

import {apiClient} from 'services/apollo/apollo';

import {Provider} from 'react-redux';
import RestaurantStore from 'stores/RestaurantStore';

import Dashboard from 'components/Dashboard.react';
import Landing from 'components/landing/Landing.react';

function App(): Node {
  return (
    <Provider store={RestaurantStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apiClient}>
          <Router>
            <Switch>
              <Route exact path="/restaurant" component={Landing} />
              <Route path="/restaurant/protected/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
