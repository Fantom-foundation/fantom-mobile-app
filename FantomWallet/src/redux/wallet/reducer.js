// @flow
import { types } from './actions';
import type { TransactionT } from './actions';

type Wallet = {
  balance: string,
  loading: boolean,
  history: Array<TransactionT>,
};

type actionType = {
  type: string,
  payload: Wallet,
};

const initialState = {
  balance: '0',
  loading: false,
  history: [],
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
    default:
      return state;
  }
};
