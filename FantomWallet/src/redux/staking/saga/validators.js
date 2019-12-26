// @flow
import { takeLatest, put, select, call } from "redux-saga/effects";
import {
  types,
  getValidatorsListSuccess,
  getValidatorsListFailure
} from "../actions";
import { getDataWithQueryString } from "../../../common/api";

const validatorsListApi = async () => {
  return getDataWithQueryString("validatorList", `?verbosity=2`);
};

export function* validatorsListSaga(): any {
  try {
    const response = yield call(validatorsListApi);
    yield put(getValidatorsListSuccess(response));
  } catch (exception) {
    yield put(getValidatorsListFailure());
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.VALIDATORS_LIST, validatorsListSaga);
}
