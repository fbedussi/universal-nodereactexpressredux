import {Set} from 'immutable';
import {
  ADD_STYLESHEET_LINK,
  REMOVE_STYLESHEET_LINK
} from './linksStylesheetActions';

import type {
  ACTION
} from 'TYPES/Actions';

function addPath(path: string): string {

  /* eslint no-undef: 0 */
  return `${__WEBPACK_DEFINED_CSSPATH__}/${path}`;
}


function add(links: Set, link: string): Set {
  return links.add(link);
}
function remove(links: Set, link: string): Set {
  return links.delete(link);
}

export function linksStylesheet(state = new Set(), action: ACTION): Set {

  switch(action.type) {
    case ADD_STYLESHEET_LINK:
      return add(state, addPath(action.payload.href));

    case REMOVE_STYLESHEET_LINK:
      return remove(state, addPath(action.payload.href));

    default:
      return state;
  }
}
