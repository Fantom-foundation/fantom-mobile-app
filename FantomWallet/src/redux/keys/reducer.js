// @flow
import { types } from "./actions";

export type KeyReducerT = {
  masterKey: string,
  publicKey: string,
  privateKey: string
};

type KeyStateT = {
  wallets: Array<KeyReducerT>,
  mnemonic: string
};
type Action = {
  type: string,
  payload: KeyReducerT
};

const initialState = {
  mnemonic: "",
  wallets: []
};

const KeyReducer = (state: KeyStateT = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_KEYS:
      let oldWallets = [...state.wallets];
      const { publicKey } = action.payload;
      const index = oldWallets.findIndex(item => item.publicKey === publicKey);

      if (index > -1) {
        oldWallets.splice(index, 1, action.payload);
      } else {
        oldWallets.push(action.payload);
      }
      return {
        ...state,
        wallets: oldWallets
      };
    case types.SET_MNEMONIC:
      return {
        ...state,
        mnemonic: action.payload.mnemonic
      };
    default:
      return state;
  }
};

export default KeyReducer;
