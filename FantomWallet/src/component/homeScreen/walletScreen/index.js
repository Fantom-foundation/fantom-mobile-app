import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

import Header from '../../../general/header/';
import WalletNavigationTab from '../../../general/navigationTab/walletNavigationTab/';

/**
 * To Display WalletTab related tasks
 */
export default class WalletScreen extends Component {

  handleGoBack = () => {
    console.log('sdjfghaskdfagsj', this.props.navigation);

    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={style.walletViewStyle} >
        <Header text='FANTOM' rightButtonIcon='settings' headerStyle={{ backgroundColor: '#EEBD12', }} />
        <View style={{ backgroundColor: '#fff' }}>
          <TouchableOpacity onPress={this.handleGoBack}>
            <MaterialIcon name="arrow-back" size={25} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <WalletNavigationTab />
        </ScrollView>
      </View>
    );
  }
}