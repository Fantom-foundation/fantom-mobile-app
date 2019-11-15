import { combineReducers } from 'redux';

import keys from './keys/reducer';
import addressBook from './addressBook/reducer';
import wallet from './wallet/reducer';
import notification from './notification/reducer';

const appReducers = combineReducers({
  keys,
  addressBook,
  wallet,
  notification,
});

export default appReducers;
