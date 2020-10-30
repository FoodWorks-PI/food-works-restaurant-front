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
import Menu from 'components/restaurant_menu/Menu.react';
import Landing from 'components/landing/Landing.react';
import RestaurantCreatedRedirect from 'components/restaurant_register_info/RestaurantCreatedRedirect.react';

function App(): Node {
  return (
    <Provider store={RestaurantStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apiClient}>
          <Router>
            <Switch>
              <Route exact path="/restaurant" component={Landing} />
              <Route exact path="/restaurant/protected">
                <RestaurantCreatedRedirect />
              </Route>
              <Route path="/restaurant/protected/dashboard">
                <Dashboard />
              </Route>
              <Route path="/restaurant/protected/products">
                <Menu />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
