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
        {/* <Header text='FANTOM'
          rightButtonIcon={settingIcon}
          headerStyle={{ backgroundColor: '#EEBD12', }}
          onRightIconPress={this.onRightIconPress.bind(this)}
          fantomIcon={fantomIcon}
          secondaryButtonIcon={secondaryIcon}
          leftButtonIcon={leftIcon}
        /> */}
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