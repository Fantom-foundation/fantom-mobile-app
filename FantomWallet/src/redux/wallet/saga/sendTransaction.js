// @flow
import { takeLatest, put, select } from "redux-saga/effects";
import { Alert } from "react-native";
import moment from "moment";

import { types, setLoadingSendTransaction, addTransaction } from "../actions";
import Web3Agent from "~/services/api/web3";
import type { TransactionT } from "../actions";
import { SUCCESS, FAILED, SENT } from "~/common/constants";

type Action = {
  payload: {
    to: string,
    value: string,
    memo: string,
    cbSuccess: () => void
  }
};

export function* sendTransaction({
  payload: { to, value, memo, cbSuccess }
}: Action): any {
  const otherErrorMessage =
    "Invalid error. Please check the data and try again.";
  const date = moment().format("YYYY-MMM-DD hh:mm:ss a");
  const { publicKey, privateKey } = yield select(
    ({ wallet }) => wallet.currentWallet
  );
  let transactionStatus = SUCCESS;
  let transactionId = "";
  yield put(setLoadingSendTransaction(true));
  try {
    const responce = yield Web3Agent.Fantom.transfer({
      from: publicKey,
      to,
      value,
      memo,
      privateKey
    });
    // other error
    if (!responce.blockHash) throw Error(otherErrorMessage);
    // success
    transactionId = responce.blockHash;
    Alert.alert(
      "Success",
      `Transfer successful with transaction hash: ${responce.blockHash}`,
      [
        {
          text: "Ok",
          onPress: cbSuccess,
          style: "cancel"
        }
      ]
    );
  } catch (e) {
    Alert.alert("Error", e.message || otherErrorMessage);
    transactionStatus = FAILED;
  }
  // add to local history storage
  const transaction: TransactionT = {
    type: SENT,
    amount: value,
    transactionId,
    transactionStatus,
    amountUnit: "FTM",
    from: publicKey,
    to,
    isError: false,
    date
  };
  yield put(addTransaction(transaction));
  yield put(setLoadingSendTransaction(false));
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.SEND_TRANSACTION, sendTransaction);
}
