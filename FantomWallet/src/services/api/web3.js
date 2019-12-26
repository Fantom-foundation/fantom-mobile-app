// @flow
import EthUtil from "ethereumjs-util";
import {
  API_URL_FANTOM,
  KEY_INFURA,
  EXAMPLE_ADDRESS,
  FANTOM_GET_ACCOUNT_INFO
} from "react-native-dotenv";

import contractFunctions from "../../common/constants/contractFunctions";
const Web3 = require("web3");
import { Contract, ContractOptions } from "web3-eth-contract";

const Tx = require("ethereumjs-tx");

type Transfer = {
  from: string,
  to: string,
  value: string,
  memo: string,
  privateKey: string
};

const URL_FANTOM = API_URL_FANTOM;
const URL_ETHEREUM = `https://rinkeby.infura.io/v3/${KEY_INFURA}`;

class Web3Agent {
  constructor(url: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(url));
  }

  web3: any = null;
  sfc: any = null;

  async getBalance(address: string = EXAMPLE_ADDRESS) {
    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  async delegateStake({ amount, publicKey }) {
    const abi = JSON.parse(contractFunctions);

    // Assign contract functions to sfc variable
    const web3 = new Web3(new Web3.providers.HttpProvider(API_URL_FANTOM));

    this.sfc = new web3.ftm.Contract(
      abi,
      "0xfa00face00fc0000000000000000000000000100"
    );

    this.sfc.stakersNum(); // if everything is all right, will return non-zero value
  }

  async restoreWallet(privateKey) {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet;
  }

  async transfer({ from, to, value, memo, privateKey }: Transfer) {
    const nonce = await this.web3.eth.getTransactionCount(from);
    const gasPrice = await this.web3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
      gasLimit: Web3.utils.toHex(44000),
      gasPrice: Web3.utils.toHex(gasPrice),
      nonce: Web3.utils.toHex(nonce),
      data: memo
    };

    const privateKeyBuffer = EthUtil.toBuffer(privateKey);

    const tx = new Tx(rawTx);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    const res = await this.web3.eth.sendSignedTransaction(
      `0x${serializedTx.toString("hex")}`
    );

    return res;
  }

  // async getAccounts() {

  //   const res = await this.web3.eth.getAccounts();
  //   return res;
  // }

  async getAccount(address: string) {
    console.log("FANTOM_GET_ACCOUNT_INFO", FANTOM_GET_ACCOUNT_INFO, address);
    return await fetch(`${FANTOM_GET_ACCOUNT_INFO}?address=${address}`);
  }
}

// from debug network
/* eslint-disable no-undef */
// $FlowFixMe
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default {
  Fantom: new Web3Agent(API_URL_FANTOM),
  Ethereum: new Web3Agent(URL_ETHEREUM)
};
