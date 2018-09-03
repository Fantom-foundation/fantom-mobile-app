import '../../../global';
import EthUtil from 'ethereumjs-util';
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
              resolve({ success: true });
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

export function transferMoney(from, to, value, memo, privateKey) {
  
};
