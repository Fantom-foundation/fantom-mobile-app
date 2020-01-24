// @flow
import { takeEvery, put, select, call } from "redux-saga/effects";
import {
  types,
  getValidatorsListSuccess,
  getValidatorsListFailure
} from "../actions";
import { getDataWithQueryString } from "../../../common/api";
import { Alert } from "react-native";

const validatorsListApi = async () => {
  return getDataWithQueryString("validatorList", `?verbosity=2`);
};

export function* validatorsListSaga(): any {
  try {
    const response = yield call(validatorsListApi);
    if (response) {
      yield put(getValidatorsListSuccess(response));
    }
  } catch (exception) {
    yield put(getValidatorsListFailure());
  }
}

export default function* listener(): Iterable<any> {
  yield takeEvery(types.VALIDATORS_LIST, validatorsListSaga);
}
