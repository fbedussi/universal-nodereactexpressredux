// @flow

import type {
  State
} from './titleTypes';

import type {
  Action
} from 'TYPES/Actions';

import {
  CHANGE_TITLE,
  DEFAULT_TITLE,
  defaultTitle
} from './titleActions';

const getDefault = () => defaultTitle().payload.title;

export function title(state: State, action: Action): State {

  if(!state && state !== '') {
    return getDefault();
  }

  switch(action.type) {

    case DEFAULT_TITLE:
      return getDefault();

    case CHANGE_TITLE:
      return action.payload.title;

    default:
      return state;
  }
}
