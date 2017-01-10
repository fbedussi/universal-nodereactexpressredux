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
    stylesheets: []
  };
};

const addStylesheets = (state: State, action: Action): State => {
  let next = action.payload.links;
  let prev = state.stylesheets;
  let news = [];

  for(let i = 0; i < next.length; i++) {
    const n = `${state.css}/${next[i]}`;
    if(!~prev.indexOf(n)) {
      news.push(n);
    }
  }

  return news.length ? {...state, stylesheets: prev.concat(news)} : state;
};

const removeStylesheets = (state: State, action: Action): State => {
  let prev = state.links;
  let len = prev.length;
  let next = action.payload.stylesheets;

  prev = prev.filter(p => !~next.indexOf(p.replace(state.css, '')));

  return len === prev.length ? state : {...state, stylesheets: prev};
};

export function application(state: State = getDefault(), action: Action): State {

  switch(action.type) {

    case CHANGE_TITLE:
      return {...state, title: action.payload.title};

    case ADD_STYLESHEET:
      return addStylesheets(state, action);

    case REMOVE_STYLESHEET:
      return removeStylesheets(state, action);

    default:
      return state;
  }
}
