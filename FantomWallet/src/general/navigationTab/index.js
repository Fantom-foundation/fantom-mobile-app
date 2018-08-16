import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

/**
 * HomeScreen Tabs
 */
import WalletTab from '../../component/homeScreen/walletScreen/';
import WithdrawTab from '../../component/homeScreen/withdrawScreen/';
import DepositTab from '../../component/homeScreen/depositScreen/';
import ActivityTab from '../../component/homeScreen/activityScreen/';

/**
 * NavigationIcons
 */


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
        let iconName;
        if (routeName === 'Wallet') {
          iconName = `account-balance-wallet`;
          return <MaterialIcons name={iconName} size={20} color={tintColor} />;
        } else if (routeName === 'Withdraw') {
          iconName = `send`;
          return <FontAwesomeIcons name={iconName} size={15} color={tintColor} />;
        } else if (routeName === 'Deposit') {
          iconName = `download`;
          return <FeatherIcons name={iconName} size={20} color={tintColor} />;
        } else if (routeName === 'Activity') {
          iconName = `directions-run`;
          // return <Image source={activityIcon} style={{backgroundColor: 'yellow', width: 20, height: 20}} />
          return <MaterialIcons name={iconName} size={20} color={tintColor} />;
        }
      },
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#EEBD12',
      inactiveTintColor: '#000',
      showLabel: false,
    },
    animationEnabled: false,
    swipeEnabled: false,
  });
