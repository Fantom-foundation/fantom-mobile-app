// @flow
export const types = {
  GET_BALANCE: "wallet/GET_BALANCE",
  SET_BALANCE: "wallet/SET_BALANCE",
  GET_HISTORY: "wallet/GET_HISTORY",
  SET_HISTORY: "wallet/SET_HISTORY",
  SEND_TRANSACTION: "wallet/SEND_TRANSACTION",
  SET_LOADING_SEND: "wallet/SET_LOADING_SEND",
  ADD_TRANSACTION: "wallet/add_transaction",
  SET_WALLET_NAME: "wallet/SET_WALLET_NAME",
  SET_CURRENT_WALLET: "wallet/SET_CURRENT_WALLET",
  SET_FANTOM_BALANCE_RATE: "wallet/SET_FANTOM_BALANCE_RATE"
};

type Balance = {
  loading: boolean,
  balance?: string
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
  date: string
};

type SendTransactionT = {
  to: string,
  value: string,
  memo: string,
  cbSuccess: () => void
};

export type WalletInfoT = {
  name: string,
  publicKey: string
};

export const getBalance = ({ loading }: Balance) => ({
  type: types.GET_BALANCE,
  payload: { loading }
});

export const setBalance = ({ name, publicKey, balance, loading }: Balance) => ({
  type: types.SET_BALANCE,
  payload: { name, publicKey, balance, loading }
});

export const getHistory = () => ({
  type: types.GET_HISTORY
});

export const setHistory = ({
  publicKey,
  balance,
  history
}: {
  history: Array<TransactionT>,
  publicKey: String,
  balance: number
}) => ({
  type: types.SET_HISTORY,
  payload: { history, publicKey, balance }
});

export const sendTransaction = ({
  to,
  value,
  memo,
  cbSuccess
}: SendTransactionT) => ({
  type: types.SEND_TRANSACTION,
  payload: { to, value, memo, cbSuccess }
});

export const setLoadingSendTransaction = (
  sendTransactionIsLoading: boolean
) => ({
  type: types.SET_LOADING_SEND,
  payload: { sendTransactionIsLoading }
});

export const addTransaction = (transaction: TransactionT) => ({
  type: types.ADD_TRANSACTION,
  payload: { transaction }
});

export const setWalletName = (walletInfo: WalletInfoT) => ({
  type: types.SET_WALLET_NAME,
  payload: walletInfo
});

export const setCurrentWallet = (walletData: any) => {
  console.log(walletData, "***** WalletData *****");
  return {
    type: types.SET_CURRENT_WALLET,
    payload: walletData
  };
};
