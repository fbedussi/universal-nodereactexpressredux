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

export const STYLESHEET_NS: string = 'stylesheets';
export const ADD_STYLESHEET: ACTION_TYPE = `${NS}/${STYLESHEET_NS}/add`;
export const REMOVE_STYLESHEET: ACTION_TYPE = `${NS}/${STYLESHEET_NS}/remove`;


export function changeTitle(title: string): Action {

  return {
    type: CHANGE_TITLE,
    payload: {
      title
    }
  };
}

export function addStylesheet(...links: string[]): Action {

  return {
    type: ADD_STYLESHEET,
    payload: {
      links
    }
  };
}

export function removeStylesheet(...links: string[]): Action {

  return {
    type: REMOVE_STYLESHEET,
    payload: {
      links
    }
  };
}
