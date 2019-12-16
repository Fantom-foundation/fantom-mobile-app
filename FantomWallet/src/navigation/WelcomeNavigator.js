import { createStackNavigator } from 'react-navigation';

// eslint-disable-next-line import/no-cycle
import SplashScreen from '~/views/splashScreen';
import WalletSetup from "~/views/Welcome/WalletSetup";
import CreateMnemonic from '~/views/Welcome/CreateMnemonic';
import CheckMnemonic from '~/views/Welcome/CheckMnemonic';
import RecoverWallet from '~/views/Welcome/RecoverWallet';
import CaptionOutput from "~/views/captionOutput";
import BackupWallet from "~/views/backupWallet";
import VerifyRecoveryWords from "~/views/verifyRecoveryWords";
import WalletCreated from "~/views/WalletCreated";
import SingleWallet from '~/views/InsideWallet/SingleWallet';
import SendFTM from '~/views/InsideWallet/SendFTM';
import ScanQR from '~/views/InsideWallet/ScanQR';

const WelcomeNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    SingleWallet: { screen: SingleWallet },
    SendFTM: { screen: SendFTM },
    ScanQR: { screen: ScanQR },
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
    WalletCreated
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;