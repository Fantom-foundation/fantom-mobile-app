/* eslint-disable no-console */
// @flow
import { takeLatest, put, select } from 'redux-saga/effects';

import { types, setHistory } from '../actions';
import type { TransactionT } from '../actions';

export function* getHistory(): any {
  try {
    let history: Array<TransactionT> = [];
    const { transactions } = yield select(({ transactionReducer }) => transactionReducer);

    history = [...transactions];

    yield put(setHistory({ history }));
  } catch (e) {
    console.log(e);
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.GET_HISTORY, getHistory);
}

// transactionData.push({
//   type,
//   amount: valInEther,
//   transactionId,
//   transactionStatus,
//   amountUnit: 'FTM',
//   from: data.from,
//   to: data.to,
//   isError: data.failed === false ? '0' : '1',
// });
