// @flow
export const types = {
  GET_BALANCE: 'wallet/GET_BALANCE',
  SET_BALANCE: 'wallet/SET_BALANCE',
  GET_HISTORY: 'wallet/GET_HISTORY',
  SET_HISTORY: 'wallet/SET_HISTORY',
};

type Balance = {
  loading: boolean,
  balance: string,
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
