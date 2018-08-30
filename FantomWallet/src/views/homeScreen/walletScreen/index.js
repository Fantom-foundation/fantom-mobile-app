import React, { Component } from 'react';
import { View  } from 'react-native';
import style from './style';
import WalletView from '../walletScreen/walletView/';
import { connect } from 'react-redux';
const Web3 = require('web3');

/**
 * To Display WalletTab related tasks
 */
class WalletScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
    }
    if (this.props.publicKey) {
      this.getEtherBalanceFromApiAsync(this.props.publicKey);
    }
  }

  getEtherBalanceFromApiAsync(address) {
    return fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address='+address+'&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('balance response : ',responseJson);
        if (responseJson.status && responseJson.status === "1") {
          const balance = responseJson.result;
          const valInWei = Web3.utils.fromWei(balance, 'ether');
          console.log(valInWei, 'balance');
          this.setState({
            balance: valInWei,
          })
        }
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={style.walletViewStyle} >
         <View style={style.walletScreenStyle}>
          <WalletView balance={this.state.balance}/>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    publicKey: state.keyReducer.publicKey,
  };
},
  mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
