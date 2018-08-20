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

const ACTIVE_TINT_COLOR = '#fff';


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
          return <Image source={tintColor === ACTIVE_TINT_COLOR ? walletWhiteIcon : walletIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Withdraw') {
          return <Image source={tintColor === ACTIVE_TINT_COLOR ? sendWhiteIcon : sendIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Deposit') {
          return <Image source={tintColor === ACTIVE_TINT_COLOR ? depositWhiteIcon : depositIcon} style={{ width: 30, height: 30 }} />
        } else if (routeName === 'Activity') {
          return <Image source={tintColor === ACTIVE_TINT_COLOR ? activityWhiteIcon : activityIcon} style={{ width: 30, height: 30 }} />
        }
      },
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: ACTIVE_TINT_COLOR,
      activeBackgroundColor: '#EEBD12',
      inactiveTintColor: '#000',
      showLabel: false,
    },
    tabStyle: {
      height: 70,
    },
    animationEnabled: false,
    swipeEnabled: false,
  });
