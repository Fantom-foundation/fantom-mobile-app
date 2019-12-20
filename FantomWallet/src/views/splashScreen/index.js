// @flow
/* eslint-disable */
import React, { useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import styles from './styles';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';
import NavigationService from '~/navigation/helpers/NavigationService';
import type { KeyReducerT } from '~/redux/keys/reducer';
import { setCurrentWallet as setCurrentWalletAction } from '~/redux/wallet/actions';
const isIOS = Platform.OS === 'ios';

/**
 * SplashScreen: Splash Screen for app.
 */
export const SplashScreenContainer = (props: TSplashScreenTypes) => {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  const { wallets, walletsData, setCurrentWallet, navigation } = props;
  useEffect(() => {
    let route = 'WalletSetup';
    if (
      wallets &&
      wallets.length > 0 &&
      walletsData &&
      walletsData.length > 0
    ) {
      setCurrentWallet(walletsData[0]);
      route = 'HomeScreen';
    }
    NavigationService.navigate(route);
    SplashScreen.hide();
  }, []);

  return <View style={styles.imageBackground} />;
};

const mapStateToProps = state => ({
  wallets: state.keys.wallets,
  walletsData: state.wallet.walletsData
});

export default connect(mapStateToProps, {
  setCurrentWallet: setCurrentWalletAction
})(SplashScreenContainer);
