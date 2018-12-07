import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Header from '../../../general/header/index';

import leftArrowIcon from '../../../images/arrowLeft_White.png';
import style from './style';
/**
 * Settings: This component is meant for performing tasks related to app settings.
 */
class Settings extends Component {
  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View>
          <Header
            text="Settings"
            leftButtonIcon="chevron-left"
            leftIconColor="#fff"
            leftIconSize={22}
            onLeftIconPress={() => this.onLeftIconPress()}
          />
        </View>
        <View style={style.body}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddressBook')}
            style={style.addressBookContainer}
          >
            <Text style={style.addressBookText}>Address Book</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerSupport')}
            style={style.customerSupportContainer}
          >
            <Text style={style.customerSupportText}>Customer Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AboutApp')}
            style={style.aboutAppContainer}
          >
            <Text style={style.aboutAppText}>About App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;
