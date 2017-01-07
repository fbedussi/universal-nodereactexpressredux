// @flow

import type {
  Action,
  ACTION_TYPE
} from 'TYPES/Actions';

import type {
  State
} from './titleTypes';

export const NS: string = '@@title';
export const CHANGE_TITLE: ACTION_TYPE = `${NS}/change`;
export const DEFAULT_TITLE: ACTION_TYPE = `${NS}/default`;


export function defaultTitle(): Action {

  return {
    type: DEFAULT_TITLE,
    payload: {
      title: 'Application'
    }
  };
}
export function changeTitle(title: State): Action {

  return {
    type: CHANGE_TITLE,
    payload: {
      title
    }
  };
}
