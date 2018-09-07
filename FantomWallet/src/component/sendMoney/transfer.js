import '../../../global';
import EthUtil from 'ethereumjs-util';
import axios from 'axios';
import config from '../../services/config/';
const configHelper = config();

var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);

function transferMoneyViaEthereum(from, to, value, memo, privateKey) {
  this.isConfirmationRecieved = false;
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(from).then((count) => {
      const privateKeyBuffer = EthUtil.toBuffer(privateKey);
      web3.eth.getGasPrice((err, result) => {
        const rawTx = {
          from: from,
          to: to,
          value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
          gasLimit: Web3.utils.toHex(22000),
          gasPrice: Web3.utils.toHex(result),
          nonce: Web3.utils.toHex(count),
          data: memo,
        };
        const tx = new Tx(rawTx);
        tx.sign(privateKeyBuffer);
        const serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
          .on('transactionHash', function (hash) {
            console.log('transactionHash', hash);
          })
          .on('receipt', function (receipt) {
            console.log('receipt', receipt);
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log('confirmation confirmationNumber', confirmationNumber);
            console.log('confirmation', receipt);
            if (confirmationNumber === 1 && !this.isConfirmationRecieved) {
              this.isConfirmationRecieved = true;
              let hash = '';
              if (receipt && receipt.transactionHash) {
                hash = receipt.transactionHash;
              }
              resolve({ success: true, hash });
            }
          })
          .on('error', (err) => {
            console.log('error', err);
            let message = '';
            if (err.message) {
              message = err.message
            }
            reject({ success: false, message });
          });
      });
    }).catch((err) => {
      console.log(err, 'err');
      reject({ success: false, message });
    });
  })
}

function transferMoneyViaFantom(from, to, value, memo, privateKey) {
  this.isConfirmationRecieved = false;
  return new Promise((resolve, reject) => {
    getNonceFantom(from).then((count) => {
      const privateKeyBuffer = EthUtil.toBuffer(privateKey);
      const rawTx = {
        from: from,
        to: to,
        value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
        gasPrice: '0x09184e72a000',
        gasLimit: '0x27100',
        nonce: Web3.utils.toHex(count),
        data: memo,
      };
      const tx = new Tx(rawTx);
      tx.sign(privateKeyBuffer);
      const serializedTx = tx.serialize();

        const hexTx = '0x' + serializedTx.toString('hex')

      axios.post(configHelper.apiUrl + '/sendRawTransaction', hexTx)
        .then(function (response) {
          console.log(response.data);
          if (response && response.data && response.data.txHash) {
            resolve({ success: true, hash: response.data.txHash });
          } else {
            reject({ message: 'Invalid response received' });
          }
          
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });



    }).catch((err) => {
      console.log(err, 'err');
      reject({ success: false, message });
    });
  })
}

function getNonceFantom(address) {
  return new Promise((resolve, reject) => {
    axios.get('http://18.221.128.6:8080/account/' + address)
      .then(function (response) {
        console.log('nonce', response.data.nonce)
        resolve(response.data.nonce);
        // tx.nonce = response.data.nonce
        // generateRawTx(tx, priv)
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

export function transferMoney(from, to, value, memo, privateKey) {
  console.log(configHelper, 'config');
  if (configHelper.isEthereumMode) {
    return transferMoneyViaEthereum(from, to, value, memo, privateKey);
  }
  return transferMoneyViaFantom(from, to, value, memo, privateKey);
};
