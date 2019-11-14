import { createStackNavigator, createAppContainer } from 'react-navigation';

import WellecomeNavigator from './WelcomeNavigator';
import HomeNavigator from './HomeNavigator';
import PrivacyPolicy from '~/views/Other/PrivacyPolicy';
import TermsConditions from '~/views/Other/TermsConditions';
import AddressBook from '~/views/Settings/AddressBook';
import QRScanner from '~/components/QRCodeScanner/view';
import QRGenerator from '~/components/QRCodeGenerator';
import EditContact from '~/views/Settings/AddressBook/EditContact';
import SendMoney from '~/views/Home/Withdraw/SendMoney';
import Settings from '~/views/Settings';
import AboutApp from '~/views/Settings/AboutApp';
import CustomerSupport from '~/views/Settings/CustomerSupport';

const RootNavigator = createStackNavigator(
  {
    Wellcome: { screen: WellecomeNavigator },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    SendMoney: { screen: SendMoney },
    HomeScreen: {
      screen: HomeNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
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
  },
);

export default createAppContainer(RootNavigator);
