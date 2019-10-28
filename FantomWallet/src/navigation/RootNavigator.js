import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';
import SplashScreen from '~/views/splashScreen';
import WalletSetup from '~/views/walletSetup';
import PrivacyPolicy from '~/views/privacyPolicy';
import TermsConditions from '~/views/termsConditions';
import CaptionOutput from '~/views/captionOutput';
import CaptchaVerification from '~/views/captchaVerification';
import AddressBook from '~/views/Settings/addressBook';
import QRScanner from '~/components/QRCodeScanner/view';
import QRGenerator from '~/components/QRCodeGenerator';
import EditContact from '~/views/Settings/addressBook/editContact';
import SendMoney from '~/components/SendMoney';
import Settings from '~/views/Settings';
import AboutApp from '~/views/Settings/aboutApp';
import CustomerSupport from '~/views/Settings/customerSupport';
import RecoverWallet from '~/views/recoverWallet';

const Routing = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    WalletSetup: {
      screen: WalletSetup,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    CaptionOutput: { screen: CaptionOutput },
    SendMoney: { screen: SendMoney },
    HomeScreen: {
      screen: HomeNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CaptchaVerification: { screen: CaptchaVerification },
    AddressBook: { screen: AddressBook },
    QRScanner: { screen: QRScanner },
    QRGenerator: { screen: QRGenerator },
    EditContact: { screen: EditContact },
    Settings: { screen: Settings },
    AboutApp: { screen: AboutApp },
    CustomerSupport: { screen: CustomerSupport },
    RecoverWallet: { screen: RecoverWallet },
  },
  {
    headerMode: 'none',
  }
);

export default class Router extends PureComponent {
  render() {
    return <Routing />;
  }
}
