/* eslint-disable no-console */
// @flow
import { takeLatest, call, select, put } from "redux-saga/effects";
import axios from "axios";
import { types, setHistory } from "../actions";
import { API_URL_1_FANTOM } from "react-native-dotenv";
// import type { TransactionT } from '../actions';
import { FANTOM_GET_ACCOUNT_INFO, GET_BALANCE_API } from "react-native-dotenv";

const getTransactionApi = async publicKey => {
  return await axios.get(
    `${API_URL_1_FANTOM}api/v1/get-account?address=${publicKey}&trxsFilter=from`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
const getBalanceApi = async () => {
  return await axios.get(GET_BALANCE_API);
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
    console.log("getBalance", JSON.parse(body));
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

          console.log("****** response ******", data);
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
    yield console.log(e);
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.GET_HISTORY, getHistory);
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
