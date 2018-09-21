import '../../../global';
import EthUtil from 'ethereumjs-util';
import axios from 'axios';
import config from '../../services/config';

const configHelper = config();

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

function transferMoneyViaEthereum(from, to, value, memo, privateKey) {
  this.isConfirmationRecieved = false;
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionCount(from)
      .then(count => {
        const privateKeyBuffer = EthUtil.toBuffer(privateKey);
        web3.eth.getGasPrice((err, result) => {
          const rawTx = {
            from,
            to,
            value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
            gasLimit: Web3.utils.toHex(22000),
            gasPrice: Web3.utils.toHex(result),
            nonce: Web3.utils.toHex(count),
            data: memo,
          };
          const tx = new Tx(rawTx);
          tx.sign(privateKeyBuffer);
          const serializedTx = tx.serialize();
          web3.eth
            .sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
            .on('transactionHash', hash => {
              console.log('transactionHash', hash);
            })
            .on('receipt', receipt => {
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
            .on('error', errChk => {
              console.log('error', errChk);
              let messageObj = '';
              if (errChk.message) {
                messageObj = errChk.message;
              }
              reject({ success: false, message: messageObj });
            });
        });
      })
      .catch(err => {
        console.log(err, 'err');
        reject({ success: false, message: 'Some error occured.' });
      });
  });
}

function getNonceFantom(address) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${configHelper.apiUrl}/account/${address}`)
      .then(response => {
        console.log('nonce', response.data.nonce);
        resolve(response.data.nonce);
        // tx.nonce = response.data.nonce
        // generateRawTx(tx, priv)
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

function transferMoneyViaFantom(from, to, value, memo, privateKey) {
  this.isConfirmationRecieved = false;
  return new Promise((resolve, reject) => {
    getNonceFantom(from)
      .then(count => {
        const privateKeyBuffer = EthUtil.toBuffer(privateKey);
        const rawTx = {
          from,
          to,
          value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
          // gasPrice: '0x09184e72a000',
          gasPrice: '0x000000000001',
          gasLimit: '0x27100',
          nonce: Web3.utils.toHex(count),
          data: memo,
        };
        const tx = new Tx(rawTx);
        tx.sign(privateKeyBuffer);
        const serializedTx = tx.serialize();

        const hexTx = `0x${serializedTx.toString('hex')}`;

        axios
          .post(`${configHelper.apiUrl}/sendRawTransaction`, hexTx)
          .then(response => {
            console.log(response.data);
            if (response && response.data && response.data.txHash) {
              resolve({ success: true, hash: response.data.txHash });
            } else {
              reject({ message: 'Invalid response received' });
            }
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      })
      .catch(err => {
        console.log(err, 'err');
        reject({ success: false, message: 'Some error occured.' });
      });
  });
}

export default function transferMoney(from, to, value, memo, privateKey) {
  if (configHelper.isEthereumMode) {
    return transferMoneyViaEthereum(from, to, value, memo, privateKey);
  }
  // const dummyPublicKey = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
  // const dummyPrivateKey = '0x50c4bf4dde1f383a172f52cb4624f089f685e67e00c6741a3ae03826c99cf082';

  // from = dummyPublicKey; //eslint-disable-line
  // privateKey = dummyPrivateKey;//eslint-disable-line
  // console.log('fantom transfer from : ', from);
  return transferMoneyViaFantom(from, to, value, memo, privateKey);
}
