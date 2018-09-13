import { fork } from 'redux-saga/effects';

// import Storage from 'services/storage';
import TestApi from './testApi/action';

export default function* rootSaga() {
  yield [fork(TestApi.watchVerbs)];
}
