import React, { Component } from 'react';
import { View } from 'react-native';
import style from './style';
import WalletView from '../walletScreen/walletView/';
import { connect } from 'react-redux';
const Web3 = require('web3');

/**
 * To Display WalletTab related tasks
 */
class WalletScreen extends Component {

  render() {
    const { balance, transactionData, isLoading, navigation, onRefresh } = this.props;
    return (
      <View style={style.walletViewStyle} >
        <View style={style.walletScreenStyle}>
          <WalletView balance={balance}
            navigation = {navigation}
            transactionData={transactionData}
            isLoading={isLoading}
            onRefresh={onRefresh} />
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
