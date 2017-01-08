import {takeEvery} from 'redux-saga/effects';

import {
  CHANGE_TITLE
} from 'ACTIONS';

function* logger(action) {
  yield takeEvery(CHANGE_TITLE, () => console.log('Change Title'));
}

export const SAGA = [
  logger
];
