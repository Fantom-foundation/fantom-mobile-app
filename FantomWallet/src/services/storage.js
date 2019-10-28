import { takeEvery } from 'redux-saga/effects';
import { AsyncStorage as SInfo } from 'react-native';

export const Helper = {
  storageKey: {},
  *getItem(params) {
    const { key, callback } = params.params;

    // FIXME: need TEST
    // eslint-disable-next-line no-shadow
    let item = yield SInfo.getItem(key, (error, item) => {
      if (item) {
        if (item.indexOf('{') !== -1) {
          item = JSON.parse(item); //eslint-disable-line
        }
      }
      if (callback) {
        callback(item);
      }
    });

    if (item) {
      if (item.indexOf('{') !== -1) {
        item = JSON.parse(item);
      }
    }
    if (callback) {
      callback(item);
    }

    return item;
  },
  *saveItem(params) {
    const { key, value, callback } = params;

    let formattedValue;

    let success = false;

    if (!params.type) {
      formattedValue = JSON.stringify(value);
    } else {
      formattedValue = value;
    }

    success = yield SInfo.setItem(key, formattedValue, error => {
      if (callback) {
        if (!error) {
          callback(`${key}: ${value} saved sucessfully!`);
        } else {
          callback(`${key}: ${value} failed to save`);
        }
      }
    });

    return success;
  },
  uiGetItem(params) {
    const { key, callback } = params;
    let Item;

    SInfo.getItem(key, (error, item) => {
      if (item) {
        if (item.indexOf('{') !== -1) {
          Item = JSON.parse(item);
        }
      }
      if (callback) {
        callback(item);
      }
    });

    return Item;
  },
  uiSaveItem(params) {
    const { key, value, callback } = params;
    let formattedValue;

    if (!params.type) {
      formattedValue = JSON.stringify(value);
    } else {
      formattedValue = value;
    }
    SInfo.setItem(key, formattedValue, error => {
      if (callback) {
        if (!error) {
          callback(`${key}: ${value} saved sucessfully!`);
        } else {
          callback(`${key}: ${value} failed to save`);
        }
      }
    });
  },
  uiRemoveItem(key) {
    SInfo.removeItem(key, error => {}); //eslint-disable-line
  },
  *removeItem(key) {
    const removed = yield SInfo.removeItem(key, error => {}); //eslint-disable-line

    return removed;
  },
  *clear() {
    // const cleared = yield SInfo.getAllKeys();

    // const that = this;

    yield SInfo.getAllKeys(keys => {
      SInfo.multiGet(keys, stores => {
        stores.forEach((i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          //   let value = store[i][1];
          if (key !== 'userCredentials' && key !== 'isInitialSetupDone') {
            SInfo.removeItem(key);
          }
        });
      });
    });
  },
};

export default function* Storage() {
  yield [
    takeEvery('GET_ITEM', Helper.getItem),
    takeEvery('SAVE_ITEM', Helper.saveItem),
    takeEvery('REMOVE_ITEM', Helper.removeItem),
    takeEvery('CLEAR_STORAGE', Helper.clear),
  ];
}
