import { types } from './actions';

const initialState = {
  masterKey: '',
  publicKey: '',
  privateKey: '',
};

const KeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_KEYS:
      return {
        ...state,
        publicKey: action.payload.publicKey,
        masterKey: action.payload.masterKey,
        privateKey: action.payload.privateKey,
      };

    default:
      return state;
  }
};

export default KeyReducer;
