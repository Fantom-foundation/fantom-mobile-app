// @flow
import { takeLatest, put, select, call, takeEvery } from "redux-saga/effects";
import {
  types,
  delegateByAddressesSuccess,
  delegateByAddressesFailure,
  delegateByAddress
} from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";
import { getDataWithQueryString } from "../../../common/api";
import { GET_BALANCE_API } from "react-native-dotenv";
import axios from "axios";
import Web3Agent from "../../../services/api/web3";

type Action = {
  payload: {
    mnemonic: string,
    cb: (publicKey: string) => void
  }
};

export function* delegateByAddressSaga({
  payload: { publicKey }
}: Action): any {
  try {
    const response = yield call(delegatorByAddressApi, publicKey);

    yield put(delegateByAddressesSuccess({ publicKey, response }));
  } catch (e) {
    yield put(delegateByAddressesFailure({ publicKey }));
    // yield put(setDopdownAlert("error", e.message));
  }
}

const delegatorByAddressApi = async publicKey => {
  return getDataWithQueryString(
    "delegatorByAddress",
    `${publicKey}?verbosity=2`
  );
};

export function* delegateByAddressesSaga(): any {
  const { walletsData } = yield select(({ keys, wallet }) => ({
    keys,
    walletsData: wallet.walletsData
  }));

  if (walletsData && walletsData.length > 0) {
    for (let i = 0; i < walletsData.length; i++) {
      const wallet = walletsData[i];
      const { publicKey } = wallet;
      if (publicKey) {
        try {
          const {
            pendingRewards,
            data
          } = yield Web3Agent.Fantom.getDelegationPendingRewards(
            publicKey,
            publicKey
          );
          const response = yield call(delegatorByAddressApi, publicKey);
          console.log(
            "delegateByAddressesSagadelegateByAddressesSaga",
            response
          );

          if (response) {
            const {
              address,
              amount,
              claimedRewards,
              createdEpoch,
              createdTime,
              toStakerID
            } = response.data.data;

            const { deactivatedEpoch, deactivatedTime, paidUntilEpoch } = data;
            yield put(
              delegateByAddressesSuccess({
                publicKey,
                response: {
                  address,
                  amount,
                  claimedRewards,
                  createdEpoch,
                  createdTime,
                  toStakerID,
                  deactivatedEpoch,
                  deactivatedTime,
                  paidUntilEpoch,
                  pendingRewards: pendingRewards || 0
                }
              })
            );
          } else {
            yield put(delegateByAddressesFailure({ publicKey }));
          }
        } catch (exception) {
          console.log(exception, "exceptionexception");
          yield put(delegateByAddressesFailure({ publicKey }));
        }
      }
    }
  }
}

export function* delegateByStakerIdSaga({
  payload: { stakerId }
}: Action): any {
  try {
    const response = yield call(
      getDataWithQueryString("delegatorByStakerId", stakerId)
    );
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateAmountSaga({
  payload: { amount, publicKey, validatorId, cbSuccess }
}: Action): any {
  try {
    const { keys } = yield select(({ keys }) => ({
      keys
    }));
    const key = keys.wallets.find(k => k.publicKey === publicKey);

    // const fee = yield Web3Agent.Fantom.estimateFee({
    //   from: publicKey,
    //   to: "0xfc00face00000000000000000000000000000000",
    //   value: amount.toString(),
    //   memo: ""
    // });

    // console.log(fee, "*******0xfc00face00000000000000000000000000000000***");

    const response = yield Web3Agent.Fantom.delegateStake({
      amount,
      publicKey,
      privateKey: key.privateKey,
      validatorId
    });
    yield put(delegateByAddress({ publicKey }));
    cbSuccess(true);
    // Assign contract functions to sfc variable
  } catch (e) {
    console.log(e, "eeeeeeeeeeee");
    cbSuccess(false);
    yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateUnstakeSaga({
  payload: { publicKey, cbSuccess }
}: Action): any {
  try {
    const { keys } = yield select(({ keys }) => ({
      keys
    }));
    const key = keys.wallets.find(k => k.publicKey === publicKey);
    const response = yield Web3Agent.Fantom.delegateUnstake({
      delegatorAddress: publicKey,
      privateKey: key.privateKey
    });

    cbSuccess(true);
    // Assign contract functions to sfc variable
  } catch (e) {
    console.log(e, "eeeeeeeeeeee");
    cbSuccess(false);
    yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateWithdrawSaga({
  payload: { publicKey, cbSuccess }
}: Action): any {
  try {
    const { keys } = yield select(({ keys }) => ({
      keys
    }));
    const key = keys.wallets.find(k => k.publicKey === publicKey);
    const response = yield Web3Agent.Fantom.withdrawDelegateAmount({
      delegatorAddress: publicKey,
      privateKey: key.privateKey
    });

    cbSuccess(true);
    // Assign contract functions to sfc variable
  } catch (e) {
    console.log(e, "eeeeeeeeeeee");
    cbSuccess(false);
    yield put(setDopdownAlert("error", e.message));
  }
}

export default function* listener(): Iterable<any> {
  yield takeEvery(types.DELEGATE_BY_ADDRESS, delegateByAddressSaga);
  yield takeEvery(types.DELEGATE_BY_ADDRESSES, delegateByAddressesSaga);
  yield takeEvery(types.DELEGATE_BY_STAKER_ID, delegateByStakerIdSaga);
  yield takeEvery(types.DELEGATE_AMOUNT, delegateAmountSaga);
  yield takeEvery(types.DELEGATE_UNSTAKE, delegateUnstakeSaga);
  yield takeEvery(types.WITHDRAW_DELEGATE, delegateWithdrawSaga);
}
