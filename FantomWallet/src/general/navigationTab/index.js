import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

/**
 * HomeScreen Tabs
 */
import WalletTab from '../../component/homeScreen/walletScreen/';
import WithdrawTab from '../../component/homeScreen/withdrawScreen/';
import DepositTab from '../../component/homeScreen/depositScreen/';
import ActivityTab from '../../component/homeScreen/activityScreen/';

/**
 * InActive NavigationIcons
 */

import walletIcon from '../../images/walletBlack.png';
import sendIcon from '../../images/sendIcon.png';
import depositIcon from '../../images/downloading_Black.png';
import activityIcon from '../../images/running_menBlack.png';

/**
 * Active NavigationIcons
 */
import walletWhiteIcon from '../../images/wallet_white.png';
import sendWhiteIcon from '../../images/sendWhite.png';
import depositWhiteIcon from '../../images/downloading_white.png';
import activityWhiteIcon from '../../images/running_men_White.png';

const INACTIVE_TINT_COLOR = '#000';
const ACTIVE_TINT_COLOR= '#fff';


export default TabNavigator({
  Wallet: { screen: WalletTab },
  Withdraw: { screen: WithdrawTab },
  Deposit: { screen: DepositTab },
  Activity: { screen: ActivityTab },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === 'Wallet') {
          return <Image source={tintColor === INACTIVE_TINT_COLOR ? walletIcon : walletWhiteIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Withdraw') {
          return <Image source={tintColor === INACTIVE_TINT_COLOR ? sendIcon : sendWhiteIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Deposit') {
          return <Image source={tintColor === INACTIVE_TINT_COLOR ? depositIcon : depositWhiteIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Activity') {
          return <Image source={tintColor === INACTIVE_TINT_COLOR ? activityIcon : activityWhiteIcon} style={{ width: 30, height: 30 }} />
        }
      },
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: ACTIVE_TINT_COLOR,
      activeBackgroundColor: '#EEBD12',
      inactiveTintColor: INACTIVE_TINT_COLOR,
      showLabel: false,
    },
    tabStyle: {
      height: 70,
    },
    animationEnabled: false,
    swipeEnabled: false,
  });
