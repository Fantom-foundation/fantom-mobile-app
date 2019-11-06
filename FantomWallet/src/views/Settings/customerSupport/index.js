// @flow
// Library
import React from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Header from '~/components/Header';
import fantomIcon from '~/images/fantomWhiteIcon.png';
import BackgroundImage from '~/images/BackgroundIcon.png';
// Style
import styles from './styles';

type Props = {
  navigation: {
    goBack: () => void,
  },
};

export const CustomerSupport = ({ navigation }: Props) => {
  const websiteLink = 'https://fantom.foundation/';
  const phoneNumber = 'mailto:contact@fantom.foundation';
  const displayPhoneNumber = 'contact@fantom.foundation';

  const onLeftIconPress = () => navigation.goBack();
  const renderLinkRow = (iconName, textHeading, urlLink, linkText) => {
    let IconType = MaterialIcons;
    let iconStyle = {};
    if (iconName === 'globe') IconType = FontAwesome5Icon;
    if (iconName === 'headset-mic') iconStyle = styles.linkIconStyle;
    return (
      <View style={styles.textContainer}>
        <IconType name={iconName} color="#FFF" size={20} style={iconStyle} />
        <View style={{ paddingLeft: 8 }}>
          <Text style={styles.textHeaderStyle}>{textHeading}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${urlLink}`)}>
            <Text style={styles.linkTextStyle}>{linkText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        text="Customer Support"
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        onLeftIconPress={onLeftIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <Image style={styles.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />

      <View style={styles.midContainer}>
        {renderLinkRow('globe', 'Fantom Website', websiteLink, websiteLink)}
        <View style={styles.empty} />
        {renderLinkRow('email', 'Help', phoneNumber, displayPhoneNumber)}
      </View>

      <View style={styles.footerContainerStyle}>
        <Image source={fantomIcon} style={styles.fantomIconStyle} />
        <Text style={styles.copyRight}>Copyright © 2019 Fantom.</Text>
        <Text style={styles.copyRight}>All Rights Reserved.</Text>
      </View>
    </View>
  );
};

export default CustomerSupport;
