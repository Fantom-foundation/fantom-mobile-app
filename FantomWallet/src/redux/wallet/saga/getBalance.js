// @flow
import { takeLatest, put, select } from "redux-saga/effects";
import Web3 from "web3";

import { types, setBalance, sendFtmSuccess } from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";
import Web3Agent from "~/services/api/web3";
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
          const response = yield Web3Agent.Fantom.getBalance(publicKey);

          const balanceWei = scientificToDecimal(response);

          const balance = Web3.utils.fromWei(`${balanceWei}`, "ether");
          yield put(setBalance({ name, publicKey, balance, loading: false }));
        }
      }
    }
  } catch (e) {
    //yield put(setDopdownAlert("error", e.message));
  }
}

export function* setFtmBalance(): any {
  try {
    const { currentWallet } = yield select(({ wallet }) => ({
      currentWallet: wallet.currentWallet
    }));
    const { publicKey } = currentWallet;
    const response = yield Web3Agent.Fantom.getBalance(publicKey);
    const balanceWei = scientificToDecimal(response);
    const balance = Web3.utils.fromWei(`${balanceWei}`, "ether");
    yield put(sendFtmSuccess({ balance }));
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.GET_BALANCE, getBalance);
  yield takeLatest(types.SEND_FTM, setFtmBalance);
}
