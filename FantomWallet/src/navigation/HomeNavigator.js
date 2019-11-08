import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { routes } from '~/navigation';
import WalletScreen from '~/views/Home/Wallet';
import WithdrawScreen from '~/views/Home/Withdraw';
import DepositScreen from '~/views/Home/Deposit';
import NavigationTab from '~/components/NavigationTab';
// Header
import Header from '~/components/Header';
import fantomIcon from '~/images/FantomWalletWhiteIcon.png';
import settingIcon from '~/images/setting.png';

import { store } from '~/redux/store';
import { getBalance, getHistory } from '~/redux/wallet/actions';

const deviceHeight = Dimensions.get('window').height;

const HomeTabNavigator = createBottomTabNavigator(
  {
    Wallet: { screen: WalletScreen },
    Withdraw: { screen: WithdrawScreen },
    Deposit: { screen: DepositScreen },
  },
  {
    tabBarComponent: NavigationTab,
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeStack: HomeTabNavigator,
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => {
        const onRefresh = () => {
          store.dispatch(getBalance({ loading: true }));
          store.dispatch(getHistory());
        };
        const toSettings = () => navigation.navigate(routes.root.Settings);
        return (
          <Header
            isRightBtnImage
            rightButtonIcon={settingIcon}
            headerStyle={{
              backgroundColor: 'rgb(44,52,58)',
              height: deviceHeight < 810 ? 84 : (106 / 812) * deviceHeight,
            }}
            onRightIconPress={toSettings}
            fantomIcon={fantomIcon}
            leftButtonIcon={navigation.state.routes[0].index === 0 ? 'refresh' : ''}
            leftIconColor="#fff"
            leftIconSize={30}
            rightImageStyling={{
              height: 30,
              width: 30,
            }}
            onLeftIconPress={onRefresh}
          />
        );
      },
    },
  }
);

export default HomeStackNavigator;
