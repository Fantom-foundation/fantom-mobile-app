/* eslint-disable no-console */
// @flow
import { takeEvery, call, select, put } from "redux-saga/effects";
import axios from "axios";
import { types, setHistory } from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";
import {
  GET_BALANCE_API,
  API_URL_FANTOM,
  REACT_APP_API_URL_FANTOM
} from "react-native-dotenv";

const getTransactionApi = async publicKey => {
  return await axios
    .get(`${REACT_APP_API_URL_FANTOM}api/v1/get-account?address=${publicKey}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(() => {
      return { data: { data: false } };
    });
};

const getBalanceApi = async () => {
  console.log("*****sdjasdasd");
  return await axios.get(GET_BALANCE_API).catch(() => {
    return { data: { body: false } };
  });
};

export function* getHistory(): any {
  try {
    const { walletsData } = yield select(({ keys, wallet }) => ({
      keys,
      walletsData: wallet.walletsData
    }));

    const {
      data: { body }
    } = yield call(getBalanceApi);
    if (body) {
      const balanceInfo = JSON.parse(body);

      yield put({
        type: types.SET_FANTOM_BALANCE_RATE,
        payload: Number(balanceInfo.price)
      });
    }
    if (walletsData && walletsData.length > 0) {
      for (let i = 0; i < walletsData.length; i++) {
        const wallet = walletsData[i];
        const { publicKey } = wallet;
        if (publicKey) {
          const {
            data: { data }
          } = yield call(getTransactionApi, publicKey);

          if (data && data.account) {
            const { address, transactions, balance } = data.account;

            yield put(
              setHistory({ publicKey, history: transactions, balance })
            );
          }
        }
      }
    }
  } catch (e) {
    if (
      e.message.toString().includes("Internet connection") ||
      e.message.toString().includes("Network Error")
    ) {
      yield put(
        setDopdownAlert("error", "Please check your internet connection")
      );
    }
    //  else {
    //   yield put(setDopdownAlert("error", e.message));
    // }
  }
}

export default function* listener(): Iterable<any> {
  yield takeEvery(types.GET_HISTORY, getHistory);
}

// transactionData.push({
//   type,
//   amount: valInEther,
//   transactionId,
//   transactionStatus,
//   amountUnit: 'FTM',
//   from: data.from,
//   to: data.to,
//   isError: data.failed === false ? '0' : '1',
// });
