import { combineReducers } from 'redux';

import testApiReducer from './testApi/reducer';
import keys from './keys/reducer';
import addressBookReducer from './addressBook/reducer';
import transactionReducer from './transactions/reducer';
import wallet from './wallet/reducer';

const appReducers = combineReducers({
  testApiReducer,
  keys,
  addressBookReducer,
  transactionReducer,
  wallet,
});

export default appReducers;
