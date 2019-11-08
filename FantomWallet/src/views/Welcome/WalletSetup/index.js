/* eslint-disable global-require */
import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';

import { routes } from '~/navigation';
import styles from './styles';

/**
 * WalletSetup: This component will render UI for wallet setup screen,
 *  this component is rendered only if the user first time uses the app on Phone,
 *  through this screen user is navigated to fill captcha verification to generate key.
 */
const WalletSetup = ({ navigation }) => {
  const onCreateNewWallet = () => navigation.navigate(routes.root.CreateMnemonic);
  const onRestoreWallet = () => navigation.navigate(routes.root.RecoverWallet);

  return (
    <View style={styles.backgroundContainer}>
      <StatusBar barStyle="light-content" />
      <Image
        style={styles.backgroundImage}
        source={require('~/images/BackgroundIcon.png')}
        resizeMode="contain"
      />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('~/images/FantomWalletWhiteIcon.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText1}>Beyond Blockchain</Text>
          {/* <Text style={styles.subHeaderText2}>The Future of Decentralized </Text> */}
          {/* <Text style={styles.subHeaderText2}>Ecosystem</Text> */}
        </View>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.upperButtonContainer}>
            <TouchableOpacity style={styles.recoverWalletStyle} onPress={onRestoreWallet}>
              <Text style={styles.footerText1}>Restore Wallet</Text>
            </TouchableOpacity>

            {/* <View style={styles.footer}>
              <TouchableOpacity
                style={{ height: '100%', justifyContent: 'center' }}
                onPress={() => {
                  navigation.navigate('Terms');
                }}
              >
                <Text style={styles.footerText2}>Term of Service</Text>
              </TouchableOpacity>
              <View style={styles.division} />

              <TouchableOpacity
                style={{ height: '100%', justifyContent: 'center' }}
                onPress={() => navigation.navigate('PrivacyPolicy')}
              >
                <Text style={styles.footerText2}>Privacy Policy</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <TouchableOpacity style={styles.walletSetup} onPress={onCreateNewWallet}>
            <Text style={styles.walletSetupText}>CREATE WALLET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WalletSetup;
