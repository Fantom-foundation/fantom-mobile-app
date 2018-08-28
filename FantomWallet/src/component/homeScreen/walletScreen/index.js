import React, { Component } from 'react';
import { View  } from 'react-native';
import style from './style';
import WalletNavigationTab from '../../../general/navigationTab/walletNavigationTab/';

/**
 * To Display WalletTab related tasks
 */
export default class WalletScreen extends Component {

  render() {
    return (
      <View style={style.walletViewStyle} >
        {/* <View style={style.arrowNavigationStyle}>
          <TouchableOpacity onPress={this.handleGoBack}>
            <MaterialIcon name="arrow-back" size={25} />
          </TouchableOpacity>
        </View> */}
        <View style={style.walletScreenStyle}>
          <WalletNavigationTab />
        </View>

      </View>
    );
  }
}