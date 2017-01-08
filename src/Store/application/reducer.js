// @flow

import type {
  State
} from './types';

import type {
  Action
} from 'TYPES/Actions';

import {
  CHANGE_TITLE
} from './actions';


const getDefault = (): State => ({
  title: 'Application'
});

export function application(state: State = getDefault(), action: Action): State {

  switch(action.type) {

    case CHANGE_TITLE:
      return {...state, title: action.payload.title};

    default:
      return state;
  }
}
