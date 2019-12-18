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
import SingleWallet from "~/views/InsideWallet/SingleWallet";
import SendFTM from "~/views/InsideWallet/SendFTM";
import ScanQR from "~/views/InsideWallet/ScanQR";
import ReceiveMyQcCode from "~/views/InsideWallet/ReceiveMyQcCode";
import StakingAmount from "~/views/stakingAmount";

const WelcomeNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    SettingsContainer: { screen: SettingsContainer },
    SingleWallet: { screen: SingleWallet },
    SendFTM: { screen: SendFTM },
    ScanQR: { screen: ScanQR },
    ReceiveMyQcCode: { screen: ReceiveMyQcCode },
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
    WalletInfo,
    StakingAmount: { screen: StakingAmount }
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;
