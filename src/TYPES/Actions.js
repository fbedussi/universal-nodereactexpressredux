// @flow

export type ACTION_TYPE = string;
export type ACTION_PAYLOAD = {[key: string]: any};
export interface Action {
  type: ACTION_TYPE,
  payload?: ACTION_PAYLOAD,
  error?: Error
}
