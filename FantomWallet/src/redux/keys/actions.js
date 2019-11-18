// @flow
export const types = {
  SET_KEYS: 'keys/SET_KEYS',
  GENERATE_WALLET: 'keys/GENERATE_WALLET',
  SET_MNEMONIC: 'keys/SET_MNEMONIC',
};

type MnemonicT = {
  mnemonic: string,
  cb?: () => void,
}

type SetKeys = {
  masterKey: string,
  privateKey: string,
  publicKey: string,
}

export const setKeys = ({ masterKey, privateKey, publicKey }: SetKeys) => ({
  type: types.SET_KEYS,
  payload: { masterKey, privateKey, publicKey },
});

export const generateWallet = ({ mnemonic, cb }: MnemonicT) => ({
  type: types.GENERATE_WALLET,
  payload: { mnemonic, cb },
});

export const setMnemonic = ({ mnemonic }: MnemonicT) => ({
  type: types.SET_MNEMONIC,
  payload: { mnemonic },
});