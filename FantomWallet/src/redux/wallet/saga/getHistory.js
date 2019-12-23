/* eslint-disable no-console */
// @flow
import {
  takeLatest,
  // put, select
} from 'redux-saga/effects';
import Web3Agent from "~/services/api/web3";
import {
  types,
  // setHistory
} from '../actions';
// import type { TransactionT } from '../actions';
import {
  FANTOM_GET_ACCOUNT_INFO
} from "react-native-dotenv";

const getHistoryApi = async () => {
 return await fetch(`${FANTOM_GET_ACCOUNT_INFO}?address=0x239fa7623354ec26520de878b52f13fe84b06971`)

}
export function* getHistory(): any {
  try {
    const response = yield getHistoryApi()
    console.log("history",response)
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
