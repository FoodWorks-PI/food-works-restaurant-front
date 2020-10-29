// @flow strict

import type {Action} from 'constants/RestaurantActionTypes';
import {Session} from '@oryd/kratos-client';

import ActionTypes from 'stores/actions/ActionTypes';

export type RestaurantAuthStoreState = {
  session: ?typeof Session,
  hasError: boolean,
  isFetching: boolean,
};

const authReducer = (
  state: RestaurantAuthStoreState = {
    session: null,
    hasError: false,
    isFetching: false,
  },
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_SESSION:
      return {
        ...state,
        session: action.payload,
        hasError: false,
        isFetching: false,
      };
    case ActionTypes.SET_SESSION_ERROR:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case ActionTypes.SET_SESSION_LOADING:
      return {
        ...state,
        hasError: false,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default authReducer;
