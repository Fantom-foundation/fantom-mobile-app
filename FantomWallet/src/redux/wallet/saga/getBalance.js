// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import Web3 from 'web3';

import { types, setBalance } from '../actions';
import { setDopdownAlert } from '~/redux/notification/actions';
import Web3Agent from '~/services/api/web3';
import { scientificToDecimal } from '../../../utils/converts';

export function* getBalance(): any {
  try {
    const { publicKey } = yield select(({ keys }) => keys);

    const response = yield Web3Agent.Fantom.getBalance(publicKey);
    const balanceWei = scientificToDecimal(response);
    const balance = Web3.utils.fromWei(`${balanceWei}`, 'ether');

    yield put(setBalance({ balance, loading: false }));
  } catch (e) {
    yield put(setDopdownAlert('error', e.message));
    yield put(setBalance({ balance: '0', loading: false }));
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.GET_BALANCE, getBalance);
}
