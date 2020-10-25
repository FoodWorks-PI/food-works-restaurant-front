// @flow strict

import type {Dispatch, ThunkAction} from 'constants/RestaurantActionTypes';

import ActionTypes from 'stores/actions/ActionTypes';
import {kratos} from 'services/kratos';

export function getSession(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: ActionTypes.SET_SESSION_LOADING});

    return kratos
      .whoami()
      .then((result) => {
        dispatch({type: ActionTypes.SET_SESSION, payload: result.body});
      })
      .catch((error) => {
        dispatch({type: ActionTypes.SET_SESSION_ERROR});
      });
  };
}
