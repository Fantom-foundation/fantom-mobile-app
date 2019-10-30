export const types = {
  SET_KEYS: 'keys/SET_KEYS',
  GENERATE_WALLET: 'keys/GENERATE_WALLET',
};

export const setKeys = ({ masterKey, privateKey, publicKey }) => ({
  type: types.SET_KEYS,
  payload: { masterKey, privateKey, publicKey },
});

export const generateWallet = ({ mnemonic, cb }) => ({
  type: types.GENERATE_WALLET,
  payload: { mnemonic, cb },
});
