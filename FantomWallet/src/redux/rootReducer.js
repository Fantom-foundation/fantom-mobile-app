import { combineReducers } from 'redux';

import counterReducer from './counter/reducer';
import testApiReducer from './testApi/reducer';

const appReducers = combineReducers({
    counterReducer,
    testApiReducer,
});

function rootReducer(state, action) {
    if (action.type === 'CLEAR_STORAGE') {
        state = undefined
    }
    return appReducers(state, action);
}

export default rootReducer;
