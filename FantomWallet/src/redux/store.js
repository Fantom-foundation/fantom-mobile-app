import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware()
let store = createStore(rootReducer, {},
	compose(applyMiddleware(sagaMiddleware)));


sagaMiddleware.run(rootSaga).done.catch((e) => {
	if (_.has(e, 'message')) {

	}
});
export default store;