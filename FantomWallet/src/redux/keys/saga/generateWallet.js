// @flow
import { takeLatest, put } from "redux-saga/effects";
import Bip39 from "react-native-bip39";
import EthUtil from "ethereumjs-util";
import Hdkey from "hdkey";

import { types, setKeys, setMnemonic } from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";



type Action = {
  payload: {
    mnemonic: string,
    cb: (publicKey:string) => void
  }
};

export function* generateWallet({ payload: { mnemonic, cb } }: Action): any {
  try {
    const seed = yield Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
    const root = yield Hdkey.fromMasterSeed(seed);
    const masterKey = yield root.privateKey.toString("hex");
    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = yield EthUtil.privateToPublic(addrNode._privateKey);
    const addr = yield EthUtil.publicToAddress(pubKey).toString("hex");
    const publicKey = yield EthUtil.toChecksumAddress(addr);
    const privateKey = yield EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    
    yield put(setMnemonic({ mnemonic: "" }));
    yield put(setKeys({ masterKey, privateKey, publicKey }));
    cb(publicKey );
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export function* generateWalletUsingPrivateKey({
  payload: { privateKey, cb }
}: Action): any {
  try {
    // const seed = yield Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
    // const root = yield Hdkey.fromMasterSeed(seed);
    // const masterKey = yield privateKey.toString("hex");
    // const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    // const pubKey = yield EthUtil.privateToPublic(addrNode._privateKey);
    // const addr = yield EthUtil.publicToAddress(pubKey).toString("hex");
    // const publicKey = yield EthUtil.toChecksumAddress(addr);
    // const privateKey = yield EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    // yield put(setMnemonic({ mnemonic: "" }));
    // yield put(setKeys({ masterKey, privateKey, publicKey }));
    cb();
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.GENERATE_WALLET, generateWallet);
}
