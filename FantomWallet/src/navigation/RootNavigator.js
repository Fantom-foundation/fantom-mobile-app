import { createStackNavigator, createAppContainer } from "react-navigation";

import WellecomeNavigator from "./WelcomeNavigator";
import HomeNavigator from "./HomeNavigator";
import PrivacyPolicy from "~/views/Other/PrivacyPolicy";
import TermsConditions from "~/views/Other/TermsConditions";
import AddressBook from "~/views/Settings/addressBook";
import QRScanner from "~/components/QRCode/QRCodeScanner/view";
import QRGenerator from "~/components/QRCode/QRCodeGenerator";
import EditContact from "~/views/Settings/addressBook/editContact";
import SendMoney from "~/views/Home/Withdraw/SendMoney";
import Settings from "~/views/Settings";
import AboutApp from "~/views/Settings/aboutApp";
import CustomerSupport from "~/views/Settings/customerSupport";
import AddWallet from "~/views/Settings/AddWallet";
import PrivacyAndSecurity from "~/views/Settings/PrivacyAndSecurity";
import EnterPasscode from "~/views/Settings/EnterPasscode";
import Currency from "~/views/Settings/Currency";
import ManageWallet from "~/views/Settings/ManageWallet";
import StakingAmount from "~/views/stakingAmount";

const RootNavigator = createStackNavigator(
  {
    Wellcome: { screen: WellecomeNavigator },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    SendMoney: { screen: SendMoney },
    HomeScreen: {
      screen: HomeNavigator,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AddressBook: { screen: AddressBook },
    QRScanner: { screen: QRScanner },
    QRGenerator: { screen: QRGenerator },
    EditContact: { screen: EditContact },
    Settings: { screen: Settings },
    AboutApp: { screen: AboutApp },
    CustomerSupport: { screen: CustomerSupport },
    Currency: { screen: Currency },
    EnterPasscode: { screen: EnterPasscode },
    PrivacyAndSecurity: { screen: PrivacyAndSecurity },
    AddWallet: { screen: AddWallet },
    ManageWallet: { screen: ManageWallet },
    StakingAmount: { screen: StakingAmount }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: "#111"
    }
  }
);

export default createAppContainer(RootNavigator);
