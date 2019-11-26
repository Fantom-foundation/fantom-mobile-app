// @flow
import { types } from './actions';

type KeyReducerT = {
  mnemonic: string,
  masterKey: string,
  publicKey: string,
  privateKey: string,
}

type Action = {
  type: string,
  payload: KeyReducerT
}

const initialState = {
  mnemonic: '',
  masterKey: '',
  publicKey: '',
  privateKey: '',
};

const KeyReducer = (state: KeyReducerT = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_KEYS:
      return {
        ...state,
        publicKey: action.payload.publicKey,
        masterKey: action.payload.masterKey,
        privateKey: action.payload.privateKey,
      };
    case types.SET_MNEMONIC:
      return {
        ...state,
        mnemonic: action.payload.mnemonic,
      };
    default:
      return state;
  }
};

export default KeyReducer;
