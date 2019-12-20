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
  currentWallet: WalletsDataT
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
  currentWallet: {}
};

export default (state: Wallet = initialState, action: actionType) => {
  switch (action.type) {
    case types.SET_BALANCE: {
      const { publicKey, balance, name } = action.payload;
      let oldData = state.walletsData || [];
      const index = oldData.findIndex(item => item.publicKey === publicKey);
      if (index > -1) {
        const newData = {
          ...oldData[index],
          balance
        };
        oldData.splice(index, 1, newData);
      } else {
        oldData.push({ name, publicKey, history: [], balance });
      }
      return {
        ...state,
        loading: action.payload.loading,
        walletsData: oldData
      };
    }
    case types.GET_BALANCE: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    case types.SET_HISTORY: {
      return {
        ...state,
        history: action.payload.history
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
      let oldData = state.walletsData || [];
      let history = [];
      const index = oldData.findIndex(item => item.publicKey === from);
      if (index > -1) {
        history = oldData[index].history;
        history.push(action.payload.transaction);
        const newData = {
          ...oldData[index]
        };
        oldData.splice(index, 1, newData);
      }
      return {
        ...state,
        walletsData: oldData
      };
    }
    case types.SET_WALLET_NAME: {
      const { publicKey, name } = action.payload;
      let oldData = state.walletsData || [];
      const index = oldData.findIndex(item => item.publicKey === publicKey);
      if (index > -1) {
        const newData = {
          name,
          publicKey,
          ...oldData[index]
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
    case types.SET_CURRENT_WALLET:
      return {
        ...state,
        currentWallet: action.payload
      };
    default:
      return state;
  }
};
