import React, { Component } from 'react';
import { Text, View } from 'react-native';

import style from './style';

/**
 * To Display WalletTab related tasks
 */
export default class WalletScreen extends Component {
  render() {
    return (
      <View style={style.walletViewStyle}>
        <Text style={style.textViewStyle}>Wallet</Text>
      </View>
    );
  }
}