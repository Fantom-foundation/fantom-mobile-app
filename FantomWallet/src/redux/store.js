import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const sagaMiddleware = createSagaMiddleware()




export default () => {
  let store = createStore(persistedReducer, {},
    compose(applyMiddleware(sagaMiddleware)));
  
  let persistor = persistStore(store, { timeout: 1000 });

sagaMiddleware.run(rootSaga).done.catch((e) => {
  if (_.has(e, 'message')) {

  }
});
  return { store, persistor }
}
// export default { store, persistor };