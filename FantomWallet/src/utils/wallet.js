import Web3 from "web3";

var web3 = new Web3(Web3.givenProvider);

export default class WalletUtils {
  /**
   * Store a wallet in Redux store given a private key
   *
   * @param {String} privateKey
   */
  static restoreWallet(privateKey) {
    const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

    return wallet;
  }
}
