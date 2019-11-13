// @flow
export const types = {
  GET_BALANCE: 'wallet/GET_BALANCE',
  SET_BALANCE: 'wallet/SET_BALANCE',
  GET_HISTORY: 'wallet/GET_HISTORY',
  SET_HISTORY: 'wallet/SET_HISTORY',
  SEND_TRANSACTION: 'wallet/SEND_TRANSACTION',
  SET_LOADING_SEND: 'wallet/SET_LOADING_SEND',
  ADD_TRANSACTION: 'wallet/add_transaction',
};

type Balance = {
  loading: boolean,
  balance?: string,
};

export type TransactionT = {
  type: string,
  amount: string,
  transactionId: string,
  transactionStatus: string,
  amountUnit: string,
  from: string,
  to: string,
  isError: boolean,
  date: string,
};

type SendTransactionT = {
  to: string,
  value: string,
  memo: string,
  cbSuccess: () => void,
};

export const getBalance = ({ loading }: Balance) => ({
  type: types.GET_BALANCE,
  payload: { loading },
});

export const setBalance = ({ balance }: Balance) => ({
  type: types.SET_BALANCE,
  payload: { balance, loading: false },
});

export const getHistory = () => ({
  type: types.GET_HISTORY,
});

export const setHistory = ({ history }: { history: Array<TransactionT> }) => ({
  type: types.SET_HISTORY,
  payload: { history },
});

export const sendTransaction = ({ to, value, memo, cbSuccess }: SendTransactionT) => ({
  type: types.SEND_TRANSACTION,
  payload: { to, value, memo, cbSuccess },
});

export const setLoadingSendTransaction = (sendTransactionIsLoading: boolean) => ({
  type: types.SET_LOADING_SEND,
  payload: { sendTransactionIsLoading },
});

export const addTransaction = (transaction: TransactionT) => ({
  type: types.ADD_TRANSACTION,
  payload: { transaction },
});
