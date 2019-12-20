declare type TSendReceiveTypes = {
  navigation: {
    navigate: string => void,
    goBack: () => void
  },
  addUpdateAddress: {
    address: string,
    name: string,
    timeStamp: string
  },
  currentWallet: {
    publicKey: string,
    balance: string,
    name: string,
    history: Array<TransactionT>
  }
};
