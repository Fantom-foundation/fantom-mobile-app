import { combineReducers } from 'redux';

import counterReducer from './counter/reducer'

const AppReducers = combineReducers({
    counterReducer,
});

export const rootReducer = (state, action) => {
	return AppReducers(state,action);
}