import { all } from 'redux-saga/effects';

// import TestApi from './testApi/action';
import * as wallet from './wallet/saga';

const getListeners = (...args) =>
  args.reduce((acc, nextArg) => [...acc, ...Object.values(nextArg).map(func => func())], []);

export default function* rootSaga() {
  yield all(getListeners(wallet));
  // yield [fork(TestApi.watchVerbs)];
}
