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
import Loading from '../../general/loader/'
import * as AddressAction from '../../redux/addressBook/action';
var Tx = require('ethereumjs-tx');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// Method of generation taken from: https://medium.com/bitcraft/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998;

class SendMoney extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
    this.isConfirmationRecieved = false;
  }

  transferMoney(from, to, value, fees, memo) {
    console.log('from', from);
    this.setState({ isLoading: true });
    web3.eth.getTransactionCount(from).then((count) => {
      const privateKeyBuffer = EthUtil.toBuffer(this.props.privateKey);
      web3.eth.getGasPrice((err, result) => {
        console.log('wei fees', Web3.utils.toWei(fees, 'ether'));
        var rawTx = {
          from: from,
          to: to,
          value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
          gasLimit: Web3.utils.toHex(Web3.utils.toWei(fees, 'ether')),
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
              this.setState({ isLoading: false });
              this.isConfirmationRecieved = true;
              Alert.alert('Success', 'Transfer successful.',
              [
                {text: 'Ok', onPress: () => this.alertSuccessfulButtonPressed(), style: 'cancel'},
              ]);

            }
          })
          .on('error', (err) => {
            console.log('error', err);
            let message = '';
            if (err.message) {
              message = err.message
            }
            this.setState({ isLoading: false });
            Alert.alert('Error', message);
          });
      });
    }).catch((err) => {
      console.log(err, 'err');
      let message = '';
      if (err.message) {
        message = err.message
      }
      this.setState({ isLoading: false });
      Alert.alert('Error', message);
    });
  };

  alertSuccessfulButtonPressed() {
    const { address, reload } = this.props.navigation.state.params;
    const currentDate = new Date();
    this.props.addUpdateTimestampAddress(address, '', currentDate.getTime())
    if (reload) {
      reload();
    }
    this.props.navigation.goBack()
  }

  onConfirmHandler = () => {
    const { address, coin, amount, fees, memo } = this.props.navigation.state.params;
    console.warn('confirmed');
    this.transferMoney(this.props.publicKey, address, amount, fees, memo);

  }
  render() {
    const { address, coin, amount, fees, memo } = this.props.navigation.state.params;
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
        {this.state.isLoading && <Loading />}
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
      addUpdateTimestampAddress: (walletAddress, name, timeStamp) => {
        dispatch({ type: AddressAction.ADD_UPDATE_ADDRESS, address: walletAddress, name: name || '', timeStamp })
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
