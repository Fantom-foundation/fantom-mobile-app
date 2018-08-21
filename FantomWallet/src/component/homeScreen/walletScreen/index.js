import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

import WalletNavigationTab from '../../../general/navigationTab/walletNavigationTab/';


// import Header from '../../../general/header/';

// import fantomIcon from '../../../images/fantomWhiteIcon.png';
// import secondaryIcon from '../../../images/icon.png';
// import leftIcon from '../../../images/notification_red.png';
// import settingIcon from '../../../images/setting.png';

/**
 * To Display WalletTab related tasks
 */
export default class WalletScreen extends Component {

  // handleGoBack = () => {
  //   console.log('sdjfghaskdfagsj', this.props.navigation);

  //   this.props.navigation.goBack();
  // }

  // onRightIconPress() {
  //   this.props.navigation.navigate('AddressBook');
  // }
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