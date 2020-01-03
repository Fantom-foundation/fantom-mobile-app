// @flow
import EthUtil from "ethereumjs-util";
import {
  API_URL_FANTOM,
  KEY_INFURA,
  EXAMPLE_ADDRESS,
  API_PREVIOUS_URL_FANTOM,
  FANTOM_GET_ACCOUNT_INFO,
  REACT_APP_API_URL_WEB3,
  REACT_APP_API_URL_FANTOM
} from "react-native-dotenv";

import contractFunctions from "./contractFunctions";
const Web3 = require("web3");

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
// const web3 = new Web3(new Web3.providers.HttpProvider(API_URL_FANTOM));
// const code = web3.eth
//   .getCode("0xfa00face00fc0000000000000000000000000100")
//   .then(res => console.log("code res: ", res))
//   .catch(e => console.log("code e: ", e));
// console.log("code: ", code);

class Web3Agent {
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || "")
    );
  }

  web3: any = null;
  sfc: any = null;

  async getBalance(address: string = EXAMPLE_ADDRESS) {
    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  // Get info on delegator
  getDelegate(from, delegateAddress, sfc) {
    return new Promise(resolve => {
      sfc.methods
        .delegations(delegateAddress)
        .call({ from: from }, function(error, result) {
          if (!error) resolve(result);
          console.log(error, "errorerror getDelegate");
        });
    });
  }

  // Get current epoch
  getCurrentEpoch(from, sfc) {
    return new Promise(resolve => {
      sfc.methods.currentEpoch().call({ from: from }, function(error, result) {
        if (!error) {
          resolve(result);
        }
        console.log(error, "errorerror getCurrentEpoch");
      });
    });
  }

  // Get info on delegator
  async getDelegationPendingRewards(from, delegateAddress) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3)
    );
    const sfc = new web3.eth.Contract(
      contractFunctions,
      "0xfc00face00000000000000000000000000000000"
    );

    // sfc.methods
    //   .delegations("0x2210BE0bDba6daC30c4023Ea22b4235E420178bE")
    //   .call({ from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" }, function(
    //     error,
    //     result
    //   ) {
    //     console.log("hello", error);
    //     console.log(result);
    //   });

    // Get delegator info and current epoch - 1 (i.e the previous sealed epoch)
    const info = await Promise.all([
      this.getCurrentEpoch(from, sfc),
      this.getDelegate(from, delegateAddress, sfc)
    ]);
    const maxEpochs = parseInt(info[0]) - 1;
    const fromEpoch = info[1]["paidUntilEpoch"];
    return new Promise(resolve => {
      sfc.methods
        .calcDelegationRewards(delegateAddress, fromEpoch, maxEpochs)
        .call({ from: from }, function(error, result) {
          resolve(parseFloat(result["0"]) / Math.pow(10, 18));
        });
    });
  }

  async delegateStake({ amount, publicKey, privateKey, validatorId }) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3)
    );
    const web3Sfc = new web3.eth.Contract(
      contractFunctions,
      "0xfa00face00fc0000000000000000000000000100"
    );
    // Assign contract functions to sfc variable
    // tx = this.sfc.createDelegation("1", {
    //   from: "0x2122ecA57D8F5Ca902363CbA9d256A66C7664332",
    //   value: "1"
    // });

    // const sfc = new this.web3.eth.Contract(
    //   abi,
    //   "0xfc00face00000000000000000000000000000000"
    // );
    return this.transfer({
      from: publicKey,
      to: validatorId,
      value: amount,
      memo: web3Sfc.methods.createDelegation(validatorId).encodeABI(),
      privateKey,
      gasLimit: 200000,
      web3Delegate: web3
    });

    // this.sfc.stakersNum(); // if everything is all right, will return non-zero value
  }
  async restoreWallet(privateKey) {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet;
  }

  async transfer({
    from,
    to,
    value,
    memo = "",
    privateKey,
    gasLimit = 44000,
    web3Delegate = ""
  }: Transfer) {
    const useWeb3 = web3Delegate || this.web3;
    const nonce = await useWeb3.eth.getTransactionCount(from);
    const gasPrice = await useWeb3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
      gasLimit: Web3.utils.toHex(gasLimit),
      gasPrice: Web3.utils.toHex(gasPrice),
      nonce: Web3.utils.toHex(nonce),
      data: memo
    };

    const privateKeyBuffer = EthUtil.toBuffer(privateKey);

    const tx = new Tx(rawTx);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    const res = await useWeb3.eth.sendSignedTransaction(
      `0x${serializedTx.toString("hex")}`
    );

    return res;
  }

  delegateUnstake(delegatorAddress: string) {
    const sfc = new this.web3.eth.Contract(
      contractFunctions,
      "0xfc00face00000000000000000000000000000000"
    );

    return new Promise(resolve => {
      sfc.methods
        .prepareToWithdrawDelegation()
        .call({ from: delegatorAddress }, function(error, result) {
          console.log(
            "delegateUnstakedelegateUnstakedelegateUnstake",
            result,
            error
          );
          resolve(result);
        });
    });
  }

  // async getAccounts() {

  //   const res = await this.web3.eth.getAccounts();
  //   return res;
  // }

  async getAccount(address: string) {
    console.log("REACT_APP_API_URL_FANTOM", REACT_APP_API_URL_FANTOM, address);
    return await fetch(
      `${REACT_APP_API_URL_FANTOM}api/v1/get-account?address=${address}`
    );
  }
}

// from debug network
/* eslint-disable no-undef */
// $FlowFixMe
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default {
  Fantom: new Web3Agent(),
  Ethereum: new Web3Agent(URL_ETHEREUM)
};
