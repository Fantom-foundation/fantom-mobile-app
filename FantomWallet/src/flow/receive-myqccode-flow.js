declare type TReceiveQcCode = {
  publicKey: string,
  balance: string,
  name: string,
  history: Array<TransactionT>
};
