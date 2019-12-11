// @flow
/* eslint-disable */
import React, { useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'


import styles from './styles';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';
import NavigationService from '~/navigation/helpers/NavigationService';

const isIOS = Platform.OS === 'ios';

type Props = {
  masterKey: string,
  privateKey: string,
  navigation: {
    navigate: (route: string) => {}
  }
}

/**
 * SplashScreen: Splash Screen for app.
 */
export const SplashScreenContainer = ({ masterKey, privateKey, navigation }: Props) => {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  useEffect(() => {
    const route = (masterKey && privateKey) ? 'HomeScreen' : 'WalletSetup';
    NavigationService.navigate("NewWallet");
    SplashScreen.hide()
  }, [])

  return (
    <View style={styles.imageBackground} />
  );
}


const mapStateToProps = state => ({
  masterKey: state.keys.masterKey,
  privateKey: state.keys.privateKey,
});

export default connect(
  mapStateToProps,
)(SplashScreenContainer);
