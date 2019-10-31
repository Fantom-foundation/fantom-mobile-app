import { combineReducers } from 'redux';

import keys from './keys/reducer';
import addressBook from './addressBook/reducer';
import wallet from './wallet/reducer';

const appReducers = combineReducers({
  keys,
  addressBook,
  wallet,
});

export default appReducers;
