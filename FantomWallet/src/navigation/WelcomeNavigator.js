import { createStackNavigator } from 'react-navigation';

// eslint-disable-next-line import/no-cycle
import SplashScreen from '~/views/SplashScreen';
import WalletSetup from '~/views/Welcome/WalletSetup';
import CreateMnemonic from '~/views/Welcome/CreateMnemonic';
import CheckMnemonic from '~/views/Welcome/CheckMnemonic';
import RecoverWallet from '~/views/Welcome/RecoverWallet';

const WelcomeNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    WalletSetup: {
      screen: WalletSetup,
      // navigationOptions: {
      //   gesturesEnabled: false,
      // },
    },
    CreateMnemonic: { screen: CreateMnemonic },
    CheckMnemonic: { screen: CheckMnemonic },
    RecoverWallet: { screen: RecoverWallet },
  },
  {
    headerMode: 'none',
  },
);

export default WelcomeNavigator;