// @flow strict

import {Session} from '@oryd/kratos-client';
import keyMirror from 'utils/keyMirror';

const ActionTypes = keyMirror({
  SET_SESSION: null,
  SET_SESSION_ERROR: null,
  SET_SESSION_LOADING: null,
});

export type RestaurantSessionAction = $ReadOnly<
  | {
      type: typeof ActionTypes.SET_SESSION_LOADING,
    }
  | {
      type: typeof ActionTypes.SET_SESSION_ERROR,
    }
  | {
      type: typeof ActionTypes.SET_SESSION,
      payload: typeof Session,
    },
>;

export default ActionTypes;
