// @flow
import { types } from "./actions";
import type { TransactionT, WalletInfoT } from "./actions";

type WalletsDataT = {
  publicKey: string,
  balance: string,
  name: string,
  history: Array<TransactionT>
};
type Wallet = {
  loading: boolean,
  sendTransactionIsLoading: boolean,
  walletsData: Array<WalletsDataT>,
  currentWallet: WalletsDataT,
  fantomDollarRate: number
};

type actionType = {
  type: string,
  payload: {
    ...Wallet,
    ...WalletInfoT,
    transaction: TransactionT
  }
};

const initialState = {
  loading: false,
  walletsData: [],
  sendTransactionIsLoading: false,
  currentWallet: {},
  fantomDollarRate: 0
};

export default (state: Wallet = initialState, action: actionType) => {
  switch (action.type) {
    case types.SET_BALANCE: {
      const { publicKey, balance, name } = action.payload;
      let oldData = [...state.walletsData] || [];

      const index = oldData.findIndex(item => item.publicKey === publicKey);
      if (publicKey && index > -1) {
        const newData = {
          ...oldData[index],
          balance
        };
        oldData.splice(index, 1, newData);
      }
      return {
        ...state,
        loading: action.payload.loading,
        walletsData: oldData,
        currentWallet: {
          ...state.currentWallet
          // balance
        }
      };
    }
    case types.GET_BALANCE: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    case types.SET_HISTORY: {
      const { publicKey, balance, history } = action.payload;
      let oldData = [...state.walletsData] || [];

      const index = oldData.findIndex(item => item.publicKey === publicKey);
      if (index > -1) {
        const newData = {
          ...oldData[index],
          history,
          balance
        };
        oldData.splice(index, 1, newData);
      }
      let newCurrentWallet = state.currentWallet;
      if (state.currentWallet && state.currentWallet.publicKey === publicKey) {
        newCurrentWallet = {
          ...state.currentWallet,
          history
        };
      }
      return {
        ...state,
        walletsData: oldData,

        currentWallet: newCurrentWallet
      };
    }
    case types.SET_LOADING_SEND: {
      return {
        ...state,
        sendTransactionIsLoading: action.payload.sendTransactionIsLoading
      };
    }
    case types.ADD_TRANSACTION: {
      const { from } = action.payload.transaction;
      let oldData = [...state.walletsData] || [];
      let currentWallet = state.currentWallet;
      let history = [];
      const index = oldData.findIndex(item => item.publicKey === from);
      if (index > -1) {
        history = oldData[index].history;
        history.push(action.payload.transaction);
        const newData = {
          ...oldData[index],
          history
        };
        if (currentWallet.publicKey === oldData[index].publicKey) {
          currentWallet = {
            ...currentWallet,
            history
          };
        }
        oldData.splice(index, 1, newData);
      }
      return {
        ...state,
        walletsData: oldData,
        currentWallet
      };
    }
    case types.SET_WALLET_NAME: {
      const { publicKey, name } = action.payload;
      const oldData = [...state.walletsData] || [];
      const index = oldData.findIndex(item => item.publicKey === publicKey);
      if (index > -1) {
        const newData = {
          ...oldData[index],
          name,
          publicKey
        };

        oldData.splice(index, 1, newData);
      } else {
        oldData.push({ name, publicKey, history: [], balance: 0 });
      }

      return {
        ...state,
        walletsData: oldData
      };
    }
    case types.SET_CURRENT_WALLET: {
      const { payload } = action;
      return {
        ...state,
        currentWallet: { ...payload, balance: payload.balance }
      };
    }

    case types.SET_FANTOM_BALANCE_RATE: {
      return {
        ...state,
        fantomDollarRate: action.payload
      };
    }
    default:
      return state;
  }
};
