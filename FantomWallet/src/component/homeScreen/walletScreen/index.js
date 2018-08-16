import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import style from './style';

import Header from '../../../general/header/';
import WalletNavigationTab from '../../../general/navigationTab/walletNavigationTab/';

/**
 * To Display WalletTab related tasks
 */
export default class WalletScreen extends Component {

  render() {
    return (
      <View style={style.walletViewStyle} >
        <Header text='FANTOM' rightButtonIcon='settings' headerStyle={{backgroundColor: '#EEBD12',}} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
          <WalletNavigationTab />
        </ScrollView>
      </View>
    );
  }
}