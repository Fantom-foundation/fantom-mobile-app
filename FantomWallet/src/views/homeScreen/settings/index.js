// Library
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
// Components
import Header from '../../../general/header/index';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';
// Images
import AboutApp from '../../../images/AboutApp.png';
import AddressBook from '../../../images/AddressBook.png';
import CustomerSupport from '../../../images/CustomerSupport.png';
import PrivacyPolicy from '../../../images/PrivacyPolicy.png';
import TermsOfServices from '../../../images/TermsOfServices.png';
import BackgroundIcon from '../../../images/BackgroundIcon.png';
// Styling
import style from './style';
/**
 * Settings: This component is meant for performing tasks related to app settings.
 */
class Settings extends Component {
  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  renderOptionCard(name, IconName, navigationRoute) {
    return (
      <TouchableOpacity
        style={style.cardContainer}
        onPress={() => this.props.navigation.navigate(navigationRoute)}
      >
        {/* Outer Circular View */}
        <View style={style.outerCircularView}>
          {/* Inner Circular View */}
          <View style={style.innerCircularView}>
            <Image source={IconName} style={style.iconImageStyle} resizeMode="contain" />
          </View>
        </View>
        <Text style={style.optionTextStyle}>{name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={style.container}>
        <Header
          text="Settings"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
          onLeftIconPress={() => this.onLeftIconPress()}
        />

        {/* Options */}
        <ScrollView style={{ height: DEVICE_HEIGHT }} scrollEnabled={DEVICE_HEIGHT < 665}>
          {/* Background image */}
          <Image style={style.backgroundImageStyle} source={BackgroundIcon} resizeMode="contain" />
          <View style={style.mainContainer}>
            {this.renderOptionCard('Address Book', AddressBook, 'AddressBook')}
            {this.renderOptionCard('Customer Support', CustomerSupport, 'CustomerSupport')}
            {this.renderOptionCard('Terms of Service', TermsOfServices, 'Terms')}
            {this.renderOptionCard('Privacy Policy', PrivacyPolicy, 'PrivacyPolicy')}
            {this.renderOptionCard('About App', AboutApp, 'AboutApp')}
          </View>
          <View style={{ height: DEVICE_HEIGHT * 0.08 }} />
        </ScrollView>
      </View>
    );
  }
}

export default Settings;
