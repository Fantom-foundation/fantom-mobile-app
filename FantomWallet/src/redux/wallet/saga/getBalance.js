// @flow
import { takeEvery, put, select } from "redux-saga/effects";
import Web3 from "web3";

import { types, setBalance, sendFtmSuccess } from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";
// import Web3Agent from "~/services/api/web3";
import Fantom from "web3-functions";
import { scientificToDecimal } from "../../../utils/converts";

export function* getBalance(): any {
  try {
    const { walletsData } = yield select(({ keys, wallet }) => ({
      keys,
      walletsData: wallet.walletsData
    }));

    if (walletsData && walletsData.length > 0) {
      for (let i = 0; i < walletsData.length; i++) {
        const wallet = walletsData[i];
        const { publicKey, name } = wallet;
        if (publicKey) {
          let response;
          if (Fantom) {
            response = yield Fantom.getBalance(publicKey);
          }
          let balance = "0";
          if (response) {
            const balanceWei = scientificToDecimal(response);

            balance = Web3.utils.fromWei(`${balanceWei}`, "ether");
          }

          yield put(setBalance({ name, publicKey, balance, loading: false }));
        }
      }
    }
  } catch (e) {
    if (
      e.message.toString().includes("Internet connection") ||
      e.message.toString().includes("Network Error") ||
      e.message.toString().includes("Invalid JSON RPC response") ||
      e.message.toString().includes("Network is unreachable")
    ) {
      yield put(
        setDopdownAlert("error", "Please check your internet connection")
      );
    }
    // else {
    //   yield put(setDopdownAlert("error", e.message));
    // }
  }
}

export function* setFtmBalance(): any {
  try {
    const { currentWallet } = yield select(({ wallet }) => ({
      currentWallet: wallet.currentWallet
    }));
    const { publicKey } = currentWallet;
    let response;
    let balance = "0";
    if (Fantom) {
      response = yield Fantom.getBalance(publicKey);
    }
    if (response) {
      const balanceWei = scientificToDecimal(response);
      balance = Web3.utils.fromWei(`${balanceWei}`, "ether");
    }

    yield put(sendFtmSuccess({ balance }));
  } catch (e) {
    if (
      e.message.toString().includes("Internet connection") ||
      e.message.toString().includes("Network Error") ||
      e.message.toString().includes("Invalid JSON RPC response") ||
      e.message.toString().includes("Network is unreachable")
    ) {
      yield put(
        setDopdownAlert("error", "Please check your internet connection")
      );
    }

    // else {
    //   yield put(setDopdownAlert("error", e.message));
    // }
  }
}

export default function* listener(): Iterable<any> {
  yield takeEvery(types.GET_BALANCE, getBalance);
  yield takeEvery(types.SEND_FTM, setFtmBalance);
}
