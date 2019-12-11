import { createStackNavigator } from 'react-navigation';

// eslint-disable-next-line import/no-cycle
import SplashScreen from '~/views/splashScreen';
import WalletSetup from '~/views/walletSetup';
import CreateMnemonic from '~/views/Welcome/CreateMnemonic';
import CheckMnemonic from '~/views/Welcome/CheckMnemonic';
import RecoverWallet from '~/views/Welcome/RecoverWallet';
import CaptionOutput from "~/views/captionOutput";
import BackupWallet from "~/views/backupWallet";
import VerifyRecoveryWords from "~/views/verifyRecoveryWords";
import SettingsContainer from "~/views/Settings"


const WelcomeNavigator = createStackNavigator(
  {
    
    SettingsContainer: { screen: SettingsContainer },
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
    CaptionOutput: { screen: CaptionOutput},
    BackupWallet: { screen: BackupWallet},
    VerifyRecoveryWords: { screen: VerifyRecoveryWords }
  },
  {
    headerMode: "none"
  }
);

export default WelcomeNavigator;