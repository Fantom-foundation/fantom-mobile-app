// @flow
// Library
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

// Components
import Header from '~/components/Header/index';
// Images
import AboutApp from '~/images/AboutApp.png';
import AddressBook from '~/images/AddressBook.png';
import CustomerSupport from '~/images/CustomerSupport.png';
import BackgroundIcon from '~/images/BackgroundIcon.png';
// import PrivacyPolicy from '~/images/PrivacyPolicy.png';
// import TermsOfServices from '~/images/TermsOfServices.png';
// Styling
import styles from './styles';

type Props = {
  navigation: {
    navigate: string => void,
    goBack: () => void,
  },
};

/**
 * Settings: This component is meant for performing tasks related to app settings.
 */
export const Settings = ({ navigation }: Props) => {
  const onLeftIconPress = () => navigation.goBack();
  const handleItem = navigationRoute => () => navigation.navigate(navigationRoute);

  const renderOptionCard = (name, IconName, navigationRoute) => (
    <TouchableOpacity style={styles.cardContainer} onPress={handleItem(navigationRoute)}>
      {/* Outer Circular View */}
      <View style={styles.outerCircularView}>
        {/* Inner Circular View */}
        <View style={styles.innerCircularView}>
          <Image source={IconName} style={styles.iconImageStyle} resizeMode="contain" />
        </View>
      </View>
      <Text style={styles.optionTextStyle}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        text="Settings"
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
        onLeftIconPress={onLeftIconPress}
      />
      {/* Background image */}
      <Image style={styles.backgroundImageStyle} source={BackgroundIcon} resizeMode="contain" />

      {/* Options */}
      <ScrollView style={styles.listContainer}>
        <View style={styles.mainContainer}>
          {renderOptionCard('Address Book', AddressBook, 'AddressBook')}
          {renderOptionCard('Customer Support', CustomerSupport, 'CustomerSupport')}
          {/* {renderOptionCard('Terms of Service', TermsOfServices, 'Terms')}
            {renderOptionCard('Privacy Policy', PrivacyPolicy, 'PrivacyPolicy')} */}
          {renderOptionCard('About App', AboutApp, 'AboutApp')}
        </View>
        <View style={styles.empty} />
      </ScrollView>
    </View>
  );
};

export default Settings;
