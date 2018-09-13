import _ from 'lodash';
import TestApi from './action';
import testApiFormat from './format';
import model from './model';
// import Mock from './mock'

export default function testApiReducer(state = model, action) {
  //   let body;
  let response;
  let mock;
  let updatedState;
  let data;
  // mock = Mock;

  if (_.has(action, 'params.response')) {
    // response = action.params.response;
  }

  if (_.has(action, 'params.params.body')) {
    // body = action.params.params.body;
  }

  switch (action.type) {
    case TestApi.type.get.request:
      if (mock) {
        data = testApiFormat.format(mock);

        updatedState = {
          ...state,
          ...data,
          isRequesting: false,
        };
      } else {
        updatedState = {
          ...state,
          isRequesting: true,
        };
      }
      return updatedState;

    case TestApi.type.get.success:
      if (mock) {
        updatedState = state;
      } else {
        data = testApiFormat.format(response);

        updatedState = {
          ...state,
          ...data,
          isRequesting: false,
        };
      }

      return updatedState;

    case TestApi.type.get.failure:
      return {
        ...state,
        isRequesting: false,
      };

    default:
      return state;
  }
}
