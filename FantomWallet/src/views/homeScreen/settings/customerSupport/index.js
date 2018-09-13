import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';

import Header from '../../../../general/header';
import leftArrowIcon from '../../../../images/arrowLeft_White.png';
import fantomIcon from '../../../../images/fantom_Icon.png';
import style from './style';

class CustomerSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteLink: 'https://fantom.foundation/',
      phoneNumber: 'tel://100012345678',
      displayPhoneNumber: '1000-12345678',
    };
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  render() {
    const { websiteLink, phoneNumber, displayPhoneNumber } = this.state;
    return (
      <View style={style.container}>
        <Header
          text="Customer Support"
          leftButtonIcon={leftArrowIcon}
          onLeftIconPress={() => this.onLeftIconPress()}
        />
        <View style={style.mid}>
          <View style={style.textContainer}>
            <Text> Fantom Website: </Text>
            <Text
              style={{ color: '#EEBD12', textDecorationLine: 'underline' }}
              onPress={() => Linking.openURL(`${websiteLink}`)}
            >
              {websiteLink}
            </Text>
          </View>
          <TouchableOpacity>
            <View style={style.helpContainer}>
              <Text> Help: </Text>
              <Text onPress={() => Linking.openURL(`${phoneNumber}`)}>{displayPhoneNumber}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.footer}>
          <Image
            source={fantomIcon}
            resetMode="contain"
            style={{ width: 30, height: 30, padding: 20 }}
          />
          <Text style={style.copyRight}>Copyright Â© 2018 FANTOM.</Text>
          <Text style={style.rights}>All Rights Reserved.</Text>
        </View>
      </View>
    );
  }
}

export default CustomerSupport;
