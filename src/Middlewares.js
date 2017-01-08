import createSagaMiddleware from 'redux-saga';
import {applyMiddleware} from 'redux';
import {SAGA} from 'SAGA';

const saga = createSagaMiddleware();

export const middlewares = applyMiddleware(
  saga
);

export const sagaMiddleware = {
  run() {
    return saga.run(...SAGA);
  }
};
