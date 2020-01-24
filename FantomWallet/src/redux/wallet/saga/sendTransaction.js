// @flow
import { takeEvery, put, select } from "redux-saga/effects";
import { Alert } from "react-native";
import moment from "moment";
import Web3 from "web3";
import {
  types,
  setLoadingSendTransaction,
  addTransaction,
  getHistory
} from "../actions";
import Web3Agent from "~/services/api/web3";
import type { TransactionT } from "../actions";
import { SUCCESS, FAILED, SENT } from "~/common/constants";
import { setDopdownAlert } from "~/redux/notification/actions";
type Action = {
  payload: {
    to: string,
    value: string,
    memo: string,
    cbSuccess: (isSuccess: boolean) => void
  }
};

export function* sendTransaction({
  payload: { to, value, memo, cbSuccess }
}: Action): any {
  const otherErrorMessage =
    "Invalid error. Please check the data and try again.";
  const date = moment().format("YYYY-MMM-DD hh:mm:ss a");

  const { publicKey, keys } = yield select(({ wallet, keys }) => ({
    publicKey: wallet.currentWallet.publicKey,
    keys
  }));
  let privateKey = "";
  if (keys && keys.wallets.length > 0) {
    const data = keys.wallets.find(item => item.publicKey === publicKey);
    if (data) {
      privateKey = data.privateKey;
    }
  }
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
    // if (!responce.blockHash) throw Error(otherErrorMessage);
    // success
    transactionId = responce.blockHash;
    // const transaction: TransactionT = {
    //   type: SENT,
    //   value: Web3.utils.toWei(value, "ether"),
    //   hash: transactionId,
    //   transactionStatus,
    //   amountUnit: "FTM",
    //   from: publicKey,
    //   to,
    //   isError: false,
    //   timestamp: date
    // };

    yield put(getHistory());
    // add to local history storage
    yield put(setLoadingSendTransaction(false));
    yield put({ type: types.GET_BALANCE, payload: { loading: false } });
    Alert.alert(
      "Success",
      `Transfer successful with transaction hash: ${responce.blockHash}`,
      [
        {
          text: "Ok",
          onPress: () => cbSuccess(true),
          style: "cancel"
        }
      ]
    );
  } catch (e) {
    yield put(setLoadingSendTransaction(false));
    cbSuccess(false);
    if (
      e.message.toString().includes("Internet connection") ||
      e.message.toString().includes("Network Error") ||
      e.message.toString().includes("Invalid JSON RPC response") ||
      e.message.toString().includes("Network is unreachable")
    ) {
      yield put(
        setDopdownAlert("error", "Please check your internet connection")
      );
    } else {
      Alert.alert("Error", e.message || otherErrorMessage);
    }

    transactionStatus = FAILED;
  }
}

export default function* listener(): Iterable<any> {
  yield takeEvery(types.SEND_TRANSACTION, sendTransaction);
}
