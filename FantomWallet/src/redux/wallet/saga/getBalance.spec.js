/* eslint-disable import/first */
import { expectSaga } from 'redux-saga-test-plan';

jest.mock('~/services/api/web3', () => ({
  Fantom: {
    getBalance: () => 1234500000000000000,
  },
}));

import { getBalance } from './getBalance';
import { setBalance } from '../actions';

const state = {
  keys: {
    publicKey: '0xe983ebB369DCDf71F1eEEca2231b16D7db9c8105',
  },
};

const emptyState = {};

it('just works!', () =>
  expectSaga(getBalance)
    .withState(state)
    .put(setBalance({ balance: '1.2345', loading: false }))
    .run());

it('throw error | empty state', () =>
  expectSaga(getBalance)
    .withState(emptyState)
    .put(setBalance({ balance: '0', loading: false }))
    .run());
