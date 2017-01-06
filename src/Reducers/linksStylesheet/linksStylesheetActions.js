import type {
  ACTION,
  ACTION_TYPE
} from 'TYPES/Actions';

export const NS = 'linksStylesheet';
export const ADD_STYLESHEET_LINK: ACTION_TYPE = `${NS}::ADD`;
export const REMOVE_STYLESHEET_LINK: ACTION_TYPE = `${NS}::REMOVE`;

export function addStylesheetLink(href): ACTION {
  return {
    type: ADD_STYLESHEET_LINK,
    payload: {href}
  };
}
export function removeStylesheetLink(href): ACTION {
  return {
    type: REMOVE_STYLESHEET_LINK,
    payload: {href}
  };
}
