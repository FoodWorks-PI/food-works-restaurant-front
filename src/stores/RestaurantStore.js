// @flow strict

import type {RestaurantAuthStoreState} from 'stores/reducers/authReducer';
import type {Action, Dispatch} from 'constants/RestaurantActionTypes';
import type {Store} from 'redux';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import authReducer from 'stores/reducers/authReducer';
import thunk from 'redux-thunk';

export type RestaurantStoreState = {
  auth: RestaurantAuthStoreState,
};

type RestaurantRootReducerType = (
  state: RestaurantStoreState,
  action: Action,
) => RestaurantStoreState;

export type RestaurantStore = Store<RestaurantStoreState, Action, Dispatch>;

const rootReducer: RestaurantRootReducerType = combineReducers({
  auth: authReducer,
});

const store: RestaurantStore = createStore(rootReducer, applyMiddleware(thunk));

export default store;
