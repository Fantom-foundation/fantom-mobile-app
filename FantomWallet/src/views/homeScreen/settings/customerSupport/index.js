// Library
import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Header from '../../../../general/header';
import fantomIcon from '../../../../images/fantomWhiteIcon.png';
import BackgroundImage from '../../../../images/BackgroundIcon.png';
// Style
import style from './style';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

class CustomerSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteLink: 'https://fantom.foundation/',
      phoneNumber: 'mailto:contact@fantom.foundation',
      displayPhoneNumber: 'contact@fantom.foundation',
    };
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  renderLinkRow(iconName, textHeading, urlLink, linkText) {
    let IconType = MaterialIcons;
    if (iconName === 'globe') {
      IconType = FontAwesome5Icon;
    }
    let iconStyle = {};
    if (iconName === 'headset-mic') {
      iconStyle = { transform: [{ rotateX: '0deg' }, { rotateY: '180deg' }] };
    }
    return (
      <View style={style.textContainer}>
        <IconType name={iconName} color="#FFF" size={20} style={iconStyle} />
        <View style={{ paddingLeft: 8 }}>
          <Text style={style.textHeaderStyle}>{textHeading}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${urlLink}`)}>
            <Text style={style.linkTextStyle}>{linkText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { websiteLink, phoneNumber, displayPhoneNumber } = this.state;
    return (
      <View style={style.container}>
        <Header
          text="Customer Support"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />
        <Image style={style.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />

        <View style={style.midContainer}>
          {this.renderLinkRow('globe', 'Fantom Website', websiteLink, websiteLink)}
          <View style={{ height: 25 }} />
          {this.renderLinkRow('email', 'Help', phoneNumber, displayPhoneNumber)}
        </View>

        <View style={style.footerContainerStyle}>
          <Image source={fantomIcon} resetMode="contain" style={style.fantomIconStyle} />
          <Text style={style.copyRight}>Copyright © 2018 Fantom.</Text>
          <Text style={style.copyRight}>All Rights Reserved.</Text>
        </View>
      </View>
    );
  }
}

export default CustomerSupport;
