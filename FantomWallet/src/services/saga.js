/* eslint-disable*/
// Libraries
import { take, put, call, fork } from 'redux-saga/effects';
import _ from 'lodash';

// Helpers
import configHelper from './config';

let __cfg = configHelper();

// Constants
const apiVersion = 'v1';
const crudVerbs = ['create', 'update', 'delete', 'list', 'get', 'search'];
const phases = ['watch', 'request', 'success', 'failure', 'after'];

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const createRequestTypes = base =>
  phases.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});

export const createApiActionTypes = (entity, verbs = crudVerbs) => {
  const result = {};
  verbs.forEach(verb => {
    result[verb] = {};
    phases.forEach(phase => {
      result[verb][phase] = `${entity}_${verb}_${phase}`;
    });
  });

  return result;
};

export const createEntityApi = (entity, verbs = crudVerbs) => {
  let apiMethods = verbs;

  if (!_.isEqual(verbs, crudVerbs)) {
    apiMethods = [...verbs, ...crudVerbs];
    apiMethods = _.uniq(verbs);
  }

  const result = {
    entity,
    type: {}, // Redux type: "auth0_login_request"
    action: {}, // Redux action: {type: "auth0_login_request", params: Object}
    networkFetch: {}, // Saga call to network fetch
    watch: {}, // Saga watcher for specified verbs
    watchThunk: {}, // Saga wrapper which calls a user-defined api parameter setup function
    api: {}, // Empty object to be populated with user-defined api parameter setup functions
    ui: {}, // Functions which return redux actions. To be called from a ui component
    failure: {}, // Empty object to be populated with user-defined function
    failureWatch: {}, // Saga watcher for user-defined function
    after: {}, // Empty object to be populated with user-defined function
    afterWatch: {}, // Saga watcher for user-defined function
  };

  apiMethods.forEach(verb => {
    result.type[verb] = {};
    result.action[verb] = {};
    phases.forEach(phase => {
      // redux types
      result.type[verb][phase] = `${entity}_${verb}_${phase}`;
    });
    phases.forEach(phase => {
      // redux actions
      switch (phase) {
        case 'request':
          result.action[verb][phase] = params => ({
            type: `${entity}_${verb}_${phase}`,
            params: { params },
          });
          break;
        case 'success':
        case 'failure':
          result.action[verb][phase] = (response, params) => ({
            type: `${entity}_${verb}_${phase}`,
            params: { response, params },
          });
          break;
        case 'after':
          result.action[verb][phase] = (response, params) => ({
            type: `${entity}_${verb}_${phase}`,
            params: { response, params },
          });
          break;
        default:
          break;
      }
    });
    result.networkFetch[verb] = function*(params) {
      // saga for network fetch

      yield put(result.action[verb].request(params));

      const { response, error } = yield call(networkFetch, {
        ...params,
      });

      if (response) {
        yield put(result.action[verb].success(response, params));
        yield put(result.action[verb].after(response, params));
      } else {
        yield put(result.action[verb].failure(error, params));
      }
    };
    result.watchThunk[verb] = function*(params, watchAsync) {
      // wrapper for user api method
      // expect user to write api[verb] method e.g., result.api.login(params)
      if (result.api[verb] && typeof result.api[verb] === 'function') {
        params = yield call(result.api[verb], params); // yield call to enable generator functions with access to store state
      }
      if (watchAsync) {
        yield fork(result.networkFetch[verb], params);
      } else {
        yield call(result.networkFetch[verb], params);
      }
    };
    result.watch[verb] = function*() {
      while (true) {
        const { params, watchAsync } = yield take(`${entity}_${verb}_watch`);
        if (watchAsync) {
          yield fork(result.watchThunk[verb], params, watchAsync);
        } else {
          yield call(result.watchThunk[verb], params);
        }
      }
    };
    result.ui[verb] = function(params, watchAsync) {
      return action(`${entity}_${verb}_watch`, { params, watchAsync });
    };
    (result.afterWatch[verb] = function*() {
      // watcher for 'after'
      while (true) {
        const { params, response } = yield take(`${entity}_${verb}_after`);
        if (result.after[verb] && typeof result.after[verb] === 'function') {
          yield call(result.after[verb], params); // result.after.login = function() { }
        }
      }
    }),
      (result.failureWatch[verb] = function*() {
        // watcher for 'failure'
        while (true) {
          const { params, response } = yield take(`${entity}_${verb}_failure`);

          if (result.failure[verb] && typeof result.failure[verb] === 'function') {
            yield call(result.failure[verb], params); // result.failure.login = function() { }
          }
        }
      });
  });
  let watchVerbs = [];
  _.forOwn(result.watch, (value, key) => {
    watchVerbs.push(value);
  });
  _.forOwn(result.afterWatch, (value, key) => {
    watchVerbs.push(value);
  });
  _.forOwn(result.failureWatch, (value, key) => {
    watchVerbs.push(value);
  });
  result.watchVerbs = function*(method) {
    for (let n = 0; n < watchVerbs.length; n++) {
      yield fork(watchVerbs[n]);
    }
  };
  result.clearAfters = function() {
    _.forOwn(result.after, (value, key) => {
      _.unset(result.after, key);
    });
  };
  result.clearFailures = function() {
    _.forOwn(result.failure, (value, key) => {
      _.unset(result.failure, key);
    });
  };

  return result;
};

// HELPER FUNCTIONS
function setFetchConfig(params, files) {
  // default
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    timeout: 20000,
  };

  // merge params with default config
  config = {
    ...config,
    ...params,
  };

  if (config.method === 'PUT' || config.method === 'POST') {
    // process file uploads
    if (files.length) {
      let payload = new FormData();

      _.each(files, (file, index, list) => {
        payload.append('file', files[index]);
      });

      config.body = payload;
    } else if (config.body) {
      config.body = JSON.stringify(config.body);
    } else {
    }
  }

  return config;
}

function setFetchUrl(url, version) {
  let fetchUrl = url;

  if (!_.startsWith(fetchUrl, 'http') && _.has(__cfg, 'core.apiUrl')) {
    if (_.isUndefined(fetchUrl)) {
      // may be undefined if custom verb function is not setup by user
      fetchUrl = __cfg.core.apiUrl;
    } else {
      fetchUrl = __cfg.core.apiUrl + fetchUrl;
    }
  }

  return fetchUrl;
}

function setAuth0FetchUrl(url) {
  let fetchUrl = url;

  if (!_.startsWith(fetchUrl, 'http') && _.has(__cfg, 'auth0.apiUrl')) {
    if (_.isUndefined(fetchUrl)) {
      // may be undefined if custom verb function is not setup by user
      fetchUrl = __cfg.auth0.apiUrl;
    } else {
      fetchUrl = __cfg.auth0.apiUrl + fetchUrl;
    }
  }

  return fetchUrl;
}

function status(response) {
  let test;
  //
  if (response.ok) {
    test = Promise.resolve(response);
  } else {
    test = Promise.reject(response);
  }

  return test;
}

function json(response) {
  //
  const { headers } = response;

  let type = '';
  if (headers) {
    type = headers.get('content-type').toLowerCase();
  }

  let resolved;

  if (type.indexOf('json') !== -1) {
    resolved = Promise.resolve(response.json());
  } else if (typeof response.text === 'function') {
    resolved = Promise.resolve(response.text());
  } else if (response.message) {
    resolved = response.message;
  }

  return resolved;
}

export function networkFetch(params = {}, files = []) {
  const version = params.apiVersion || apiVersion;
  let apiUrl = '';

  let config = setFetchConfig(params, files);

  if (!params.authUrl) {
    apiUrl = setFetchUrl(params.url, version);
  } else {
    apiUrl = setAuth0FetchUrl(params.url);
    config = _.omit(config, 'authUrl');
  }

  return fetch(apiUrl, config)
    .then(status)
    .then(json)
    .then(response => ({ response }))
    .catch(apiError =>
      Promise.resolve(json(apiError)).then(error => {
        let response;
        if (_.isObject(error)) {
          response = {
            error: {
              ...error,
              ..._.pick(apiError, ['status', 'statusText', 'url']),
            },
          };
        } else {
          response = { error };
        }
        return response;
      })
    );
}
