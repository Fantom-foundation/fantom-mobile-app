/* eslint-disable */
import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import styles from './style';

// CaptchaVerification
// CaptionOutput,EditContact

/**
 * WalletSetup: This component will render UI for wallet setup screen,
 *  this component is rendered only if the user first time uses the app on Phone,
 *  through this screen user is navigated to fill captcha verification to generate key.
 */
class WalletSetup extends PureComponent {
  onCreateNewWallet() {
    this.props.navigation.navigate('CaptionOutput');
  }
  renderHeaderImage() {
    return (
      <View style={style.headerContainer}>
        <Image
          source={require('../../images/FantomWalletWhiteIcon.png')}
          style={style.headerImage}
          resizeMode="contain"
        />
      </View>
    );
  }
  renderMidContainer() {
    return (
      <View style={style.subHeaderContainer}>
        <Text style={style.subHeaderText1}>Beyond Blockchain</Text>
        <Text style={style.subHeaderText2}>The Future of Decentralized </Text>
        <Text style={style.subHeaderText2}>Ecosystem</Text>
      </View>
    );
  }

  renderBottomButtons() {
    return (
      <View style={styles.bottomButtonContainer}>
        <View style={styles.upperButtonContainer}>
          <TouchableOpacity
            style={style.recoverWalletStyle}
            onPress={() => {
              this.props.navigation.navigate('RecoverWallet');
            }}
          >
            <Text style={style.footerText1}>Restore Wallet</Text>
          </TouchableOpacity>

          <View style={style.footer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Terms');
              }}
            >
              <Text style={style.footerText2}>Terms of Service</Text>
            </TouchableOpacity>
            <View style={style.division} />

            <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
              <Text style={style.footerText2}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={style.walletSetup} onPress={() => this.onCreateNewWallet()}>
          <Text style={style.walletSetupText}>CREATE WALLET</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      // <ImageBackground
      //   style={style.imageBackground}
      //   source={require('../../images/background.png')}
      //   imageStyle={{ resizeMode: 'cover' }}
      // >
      <View style={style.imageBackground}>
        <StatusBar barStyle="light-content" />
        <View style={style.mainContainer}>
          {this.renderHeaderImage()}
          {this.renderMidContainer()}
          {this.renderBottomButtons()}
        </View>
      </View>
      //</ImageBackground>
    );
  }
}

export default WalletSetup;
