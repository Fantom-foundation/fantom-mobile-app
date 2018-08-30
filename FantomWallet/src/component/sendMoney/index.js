import '../../../global';

const Web3 = require('web3');
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { LinkButton } from 'general/';
import { AsyncStorage } from "react-native"
// import Web31 from 'web3';
// import Web3 from './web3.min.js';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import TextField from './TextField'
import { connect } from 'react-redux';
import EthUtil from 'ethereumjs-util';
var Tx = require('ethereumjs-tx');


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class SendMoney extends Component {


//   var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

// var rawTx = {
//   nonce: '0x00',
//   gasPrice: '0x09184e72a000',
//   gasLimit: '0x2710',
//   to: '0x0000000000000000000000000000000000000000',
//   value: '0x00',
//   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
// }

// var tx = new Tx(rawTx);
// tx.sign(privateKey);

// var serializedTx = tx.serialize();

// // console.log(serializedTx.toString('hex'));
// // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

// web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
// .on('receipt', console.log);

  transferMoney(from, to, value) {
    console.log('from', from);

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);
    const bn = web3.eth.blockNumber;
    console.log(bn, 'bn');

    web3.eth.getTransactionCount(from).then((count) => {
      console.log(count, 'txcount');

    web3.eth.getBalance(from).then((res) => { console.log(res, 'balance res') }).catch((err) => {console.log(err, 'balance err')})

    const privateKeyBuffer = EthUtil.toBuffer(this.props.privateKey);
    web3.eth.getGasPrice((err, result) => {
      console.log(err, 'gas price err');
      console.log(result, 'gas price result');
    
    // console.log(gasPrice, 'gasPrice');
    console.log(from, 'from');
//     var rawTx = {
//       from: from,
//       to: to,
//       value: Web3.utils.toWei(value, "ether"),
//       gas: 22000,
//       gasPrice: result,
// };
var rawTx = {
  from: from,
  to: to,
  value:  Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
  gas: Web3.utils.toHex(22000),
  gasPrice: Web3.utils.toHex(result),
  nonce: Web3.utils.toHex(count),
};
console.log(rawTx, 'rawTx');
const tx = new Tx(rawTx);
tx.sign(privateKeyBuffer);
const serializedTx = tx.serialize();
console.log(serializedTx.toString('hex'));
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('transactionHash', function(hash){
  console.log('transactionHash', hash);
})
.on('receipt', function(receipt){
  console.log('receipt', receipt);
})
.on('confirmation', function(confirmationNumber, receipt){
  console.log('confirmation confirmationNumber', confirmationNumber);
  console.log('confirmation', receipt);
})
.on('error', console.error);


});

}).catch((err) => {
  console.log(err, 'err');
});
// .then((result) => {console.log(result)})
// .catch((err) => { console.log(err) })




    // web3.eth.sendTransaction({
    //   from: from,
    //   to: to,
    //   value: Web3.utils.toWei(value, "ether"),
    // }, function (err, transactionHash) {
    //   if (err) {
    //     console.log(err);
    //     Alert.alert('Success', `${err}`);
    //   } else {
    //     console.log(transactionHash);
    //     Alert.alert('Success', `${transactionHash}`);
    //   }
    // });
  };
  onConfirmHandler = () => {
    // const { address, coin, amount, fees, memo } =   this.props.navigation.state.params;
    console.warn('confirmed');
    this.transferMoney(this.props.publicKey, '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD', '0.001');
    // this.transferMoney(this.props.publicKey, address, amount);

  }
  render() {
    // const { address, coin, amount, fees, memo } =   this.props.navigation.state.params;
    const { address, coin, amount, fees, memo } =   { address: '1', coin: '1', amount: '1', fees: '1', memo: '' }
    return (
      <View style={style.mainContainerStyle}>
        <Header text='Check Send' leftButtonIcon='arrow-back' onLeftIconPress={this.onLeftIconPress} />
        <View style={style.mid}>
          <View style={[style.textFieldStyle, { marginTop: 40, }]}>
            <TextField
              isimagePresent={true}
              // imgUrl={require('../../images/fantom-logo-dark.png')}
              imgStyle={{ width: deviceWidth * 0.2 }}
              textinputStyle={{ width: deviceWidth * 0.55 }}
              isTextPresent={true}
              rightTextValue={coin}
              placeHolderText={'Coin'}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Address'}
              isTextPresent={true}
              rightTextValue={address}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Price'}
              isTextPresent={true}
              rightTextValue={amount}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Fees'}
              isTextPresent={true}
              rightTextValue={fees}
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Memo'}
              textinputStyle={{ width: deviceWidth * 0.65 }}
              isTextPresent={true}
              rightTextValue={memo}
            />
          </View>
          <Text style={style.additionalInfoTextStyle}>
            The above information is correct
          </Text>
          <Text style={style.additionalInfoTextStyle}>
            Please check again.
          </Text>
          <View style={{ height: 40 }} />
        </View>
        <View style={style.buttonViewStyle}>
          <Button text="Cancel" buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#000' }} onPress={() => this.props.navigation.goBack()} />
          <Button text="Confirm" buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#ECB414' }} onPress={() => this.onConfirmHandler()} />
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    masterKey: state.keyReducer.masterKey,
    publicKey: state.keyReducer.publicKey,
    privateKey: state.keyReducer.privateKey,
  };
},
  mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
