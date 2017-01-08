// @flow

import type {
  Action,
  ACTION_TYPE
} from 'TYPES/Actions';

import type {
  State
} from './types';

export const NS: string = '@@application';
export const TITLE_NS: string = 'title';
export const CHANGE_TITLE: ACTION_TYPE = `${NS}/${TITLE_NS}/change`;


export function changeTitle(title: State): Action {

  return {
    type: CHANGE_TITLE,
    payload: {
      title
    }
  };
}
