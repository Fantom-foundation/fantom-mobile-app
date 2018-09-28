import { fork } from 'redux-saga/effects';

import TestApi from './testApi/action';

export default function* rootSaga() {
  yield [fork(TestApi.watchVerbs)];
}
