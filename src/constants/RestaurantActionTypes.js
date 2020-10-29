/* eslint-disable no-use-before-define */
// @flow strict

import type {RestaurantStoreState} from 'stores/RestaurantStore';
import type {RestaurantSessionAction} from 'stores/actions/ActionTypes';

export type Action = RestaurantSessionAction;

export type Dispatch = (action: Action | ThunkAction) => void;

export type ThunkGetState = () => RestaurantStoreState;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: ThunkGetState,
) => void | Promise<void>;
