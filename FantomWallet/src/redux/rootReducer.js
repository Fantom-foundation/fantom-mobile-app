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
    if (action.type === 'CLEAR_STORAGE') {
        state = undefined
    }
    return appReducers(state, action);
}

export default rootReducer;
