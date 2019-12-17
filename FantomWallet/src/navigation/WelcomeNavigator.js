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
import SettingsContainer from "~/views/Settings";
import ManageWallet from "~/views/Settings/ManageWallet";
import AddWallet from "~/views/Settings/AddWallet";
import PrivacyAndSecurity from "~/views/Settings/PrivacyAndSecurity";
import EnterPasscode from "~/views/Settings/EnterPasscode";
import Currency from "~/views/Settings/Currency";

const WelcomeNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    SettingsContainer: { screen: SettingsContainer },
    // Currency: { screen: Currency },
    // EnterPasscode: { screen: EnterPasscode },
    // PrivacyAndSecurity: { screen: PrivacyAndSecurity },
    // AddWallet: { screen: AddWallet },
    // ManageWallet: { screen: ManageWallet },
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
    WalletCreated,
    WalletInfo
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;
