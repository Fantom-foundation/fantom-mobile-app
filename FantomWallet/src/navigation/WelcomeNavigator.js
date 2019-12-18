import { createStackNavigator } from "react-navigation";

// eslint-disable-next-line import/no-cycle
import SplashScreen from "~/views/splashScreen";
import WalletSetup from "~/views/Welcome/WalletSetup";
import CreateMnemonic from "~/views/Welcome/CreateMnemonic";
import CheckMnemonic from "~/views/Welcome/CheckMnemonic";
import RecoverWallet from "~/views/Welcome/RecoverWallet";
import CaptionOutput from "~/views/captionOutput";
import BackupWallet from "~/views/backupWallet";
import VerifyRecoveryWords from "~/views/verifyRecoveryWords";
import WalletCreated from "~/views/WalletCreated";
import WalletInfo from "~/views/WalletInfo";




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
    CaptionOutput: { screen: CaptionOutput },
    BackupWallet: { screen: BackupWallet },
    VerifyRecoveryWords: { screen: VerifyRecoveryWords },
    WalletCreated: { screen: WalletCreated },
    WalletInfo: { screen: WalletInfo },
    Success: { screen: Success },

   
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;
