import { createStackNavigator } from "react-navigation";

// eslint-disable-next-line import/no-cycle
import SplashScreen from "~/views/splashScreen";
import WalletSetup from "~/views/Welcome/WalletSetup";
import CreateMnemonic from "~/views/Welcome/CreateMnemonic";
import CheckMnemonic from "~/views/Welcome/CheckMnemonic";
import RecoverWallet from "~/views/Welcome/RecoverWallet";
import BackupWallet from "~/views/backupWallet";
import WalletCreated from "~/views/WalletCreated";
import WalletImported from "~/views/WalletImported";
import WalletInfo from "~/views/WalletInfo";
import ManageWallet from "~/views/Settings/ManageWallet";

import Success from "~/views/Success";
const WelcomeNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    WalletSetup: {
      screen: WalletSetup
      // navigationOptions: {
      //   gesturesEnabled: false,
      // },
    },
    CreateMnemonic: { screen: CreateMnemonic },
    CheckMnemonic: { screen: CheckMnemonic },
    RecoverWallet: { screen: RecoverWallet },
    BackupWallet: { screen: BackupWallet },
    WalletCreated: { screen: WalletCreated },
    WalletImported: { screen: WalletImported },
    WalletInfo: { screen: WalletInfo },
    Success: { screen: Success }
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;
