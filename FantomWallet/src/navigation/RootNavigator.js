import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';
import SplashScreen from '~/views/SplashScreen';
import PrivacyPolicy from '~/views/Other/PrivacyPolicy';
import TermsConditions from '~/views/Other/TermsConditions';
import WalletSetup from '~/views/Welcome/WalletSetup';
import CreateMnemonic from '~/views/Welcome/CreateMnemonic';
import CheckMnemonic from '~/views/Welcome/CheckMnemonic';
import RecoverWallet from '~/views/Welcome/RecoverWallet';
import AddressBook from '~/views/Settings/AddressBook';
import QRScanner from '~/components/QRCodeScanner/view';
import QRGenerator from '~/components/QRCodeGenerator';
import EditContact from '~/views/Settings/AddressBook/editContact';
import SendMoney from '~/views/Home/Withdraw/SendMoney';
import Settings from '~/views/Settings';
import AboutApp from '~/views/Settings/AboutApp';
import CustomerSupport from '~/views/Settings/CustomerSupport';

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
    SendMoney: { screen: SendMoney },
    HomeScreen: {
      screen: HomeNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CreateMnemonic: { screen: CreateMnemonic },
    CheckMnemonic: { screen: CheckMnemonic },
    RecoverWallet: { screen: RecoverWallet },
    AddressBook: { screen: AddressBook },
    QRScanner: { screen: QRScanner },
    QRGenerator: { screen: QRGenerator },
    EditContact: { screen: EditContact },
    Settings: { screen: Settings },
    AboutApp: { screen: AboutApp },
    CustomerSupport: { screen: CustomerSupport },
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
