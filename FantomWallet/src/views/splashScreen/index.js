// @flow
/* eslint-disable */
import React, { useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';
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
export const SplashScreen = ({ masterKey, privateKey, navigation }: Props) => {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  useEffect(() => {
    const route = (masterKey && privateKey) ? 'HomeScreen' : 'WalletSetup'
    navigation.navigate(route)
  }, [])

  return (
    <View style={styles.imageBackground}>
      <Image source={require('~/images/fantomWhiteIcon.png')} resizeMode="contain" />
      <Image
        style={{
          width: DEVICE_WIDTH * 0.6,
          height: DEVICE_HEIGHT * 0.77,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isIOS ? 0.03 : 0.02,
          right: -((DEVICE_WIDTH * 0.45) / 2),
          position: 'absolute',
        }}
        source={require('~/images/BackgroundIcon.png')}
        resizeMode="contain"
      />
    </View>
  );
}


const mapStateToProps = state => ({
  masterKey: state.keys.masterKey,
  privateKey: state.keys.privateKey,
});

export default connect(
  mapStateToProps,
)(SplashScreen);
