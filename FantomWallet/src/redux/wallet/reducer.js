// @flow
import { types } from './actions';
import type { TransactionT } from './actions';

type Wallet = {
  balance: string,
  loading: boolean,
  history: Array<TransactionT>,
  sendTransactionIsLoading: boolean,
};

type actionType = {
  type: string,
  payload: {
    ...Wallet,
    transaction: TransactionT,
  },
};

const initialState = {
  balance: '0',
  loading: false,
  history: [],
  sendTransactionIsLoading: false,
};

export default (state: Wallet = initialState, action: actionType) => {
  switch (action.type) {
    case types.SET_BALANCE: {
      return {
        ...state,
        balance: action.payload.balance,
        loading: action.payload.loading,
      };
    }
    case types.GET_BALANCE: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case types.SET_HISTORY: {
      return {
        ...state,
        history: action.payload.history,
      };
    }
    case types.SET_LOADING_SEND: {
      return {
        ...state,
        sendTransactionIsLoading: action.payload.sendTransactionIsLoading,
      };
    }
    case types.ADD_TRANSACTION:
      return {
        ...state,
        history: [...state.history, action.payload.transaction],
      };

    default:
      return state;
  }
};
