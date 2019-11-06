/* eslint-disable global-require */
/* eslint-disable import/first */
import { expectSaga } from 'redux-saga-test-plan';
import { setLoadingSendTransaction, addTransaction } from '../actions';

jest.mock('moment', () => () => ({
  format: () => '2019-Nov-05 08:30:00 am',
}));
jest.mock('~/services/api/web3', () => ({
  Fantom: {
    transfer: () => ({
      blockHash: '0x719fA54b602b811fBBeC3cEa2eb61f4d4E994576',
    }),
  },
}));

const state = {
  keys: {
    publicKey: '0x4D36Be89CB8A3869C6003d0405408457B55954f2',
    privatekey: '0x183a6c86ae0d9f3da6f094e4b4cfa24e25ee85ab78a4b22dbcfe6f379c1f7b72',
  },
};

const payload = {
  to: '0x4D36Be89CB8A3869C6003d0405408457B55954f2',
  value: '0.1',
  memo: 'test',
  cbSuccess: () => {},
};

const transaction = {
  type: 'Sent',
  amount: '0.1',
  amountUnit: 'FTM',
  from: '0x4D36Be89CB8A3869C6003d0405408457B55954f2',
  to: '0x4D36Be89CB8A3869C6003d0405408457B55954f2',
  isError: false,
  date: '2019-Nov-05 08:30:00 am',
};

it('just works!', () => {
  const { sendTransaction } = require('./sendTransaction');
  return expectSaga(sendTransaction, { payload })
    .withState(state)
    .put(setLoadingSendTransaction(true))
    .put(
      addTransaction({
        ...transaction,
        transactionId: '0x719fA54b602b811fBBeC3cEa2eb61f4d4E994576',
        transactionStatus: 'SUCCESS',
      })
    )
    .put(setLoadingSendTransaction(false))
    .run();
});

it('throw error', () => {
  jest.resetModules();
  jest.mock('~/services/api/web3', () => ({
    Fantom: {
      transfer: () => Error('network error?'),
    },
  }));
  const { sendTransaction } = require('./sendTransaction');
  return expectSaga(sendTransaction, { payload })
    .withState(state)
    .put(setLoadingSendTransaction(true))
    .put(
      addTransaction({
        ...transaction,
        transactionId: '',
        transactionStatus: 'FAILED',
      })
    )
    .put(setLoadingSendTransaction(false))
    .run();
});
