import { combineReducers } from 'redux';

import counterReducer from './counter/reducer';
import testApiReducer from './testApi/reducer';
import keyReducer from './keys/reducer';
import addressBookReducer from './addressBook/reducer';

const appReducers = combineReducers({
  counterReducer,
  testApiReducer,
  keyReducer,
  addressBookReducer,
});

function rootReducer(state, action) {
  let newState = state;
  if (action.type === 'CLEAR_STORAGE') {
    newState = undefined;
  }
  return appReducers(newState, action);
}

export default rootReducer;
