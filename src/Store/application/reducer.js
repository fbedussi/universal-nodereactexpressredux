// @flow

import type {
  State
} from './types';

import type {
  Action
} from 'TYPES/Actions';

import {
  CHANGE_TITLE,
  ADD_STYLESHEET,
  REMOVE_STYLESHEET
} from './actions';


const getDefault = (): State => {
  /* eslint no-undef: 0 */

  return {
    title: 'Application',
    name: __WEBPACK_DEFINED_APPNAME__,
    version: __WEBPACK_DEFINED_APPVERSION__,
    public: __WEBPACK_DEFINED_PUBLICPATH__,
    css: __WEBPACK_DEFINED_CSSPATH__,
    api: __WEBPACK_DEFINED_API_PATH__,
    isProduction: __WEBPACK_ENV_PRODUCTION__,
    env: __WEBPACK_DEFINED_ENV__,
    links: []
  };
};

export function application(state: State = getDefault(), action: Action): State {

  switch(action.type) {

    case CHANGE_TITLE:
      return {...state, title: action.payload.title};

    default:
      return state;
  }
}
