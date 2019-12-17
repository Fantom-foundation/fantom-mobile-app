// @flow
import React from "react";
import { Dimensions } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { NavigationService, routes } from "~/navigation/helpers";
import Settings from "../views/Settings";
import SendReceive from "~/views/sendReceive";
import NavigationTab from "~/components/NavigationTab";
import NewWallet from "~/views/Home/NewWallet";
import SingleWallet from "~/views/InsideWallet/SingleWallet";
import SendFTM from "~/views/InsideWallet/SendFTM";
import ScanQR from "~/views/InsideWallet/ScanQR";

// import { store } from "~/redux/store";
// import { getBalance, getHistory } from "~/redux/wallet/actions";
import WalletScreen from "~/views/Home/Wallet";
import WithdrawScreen from "~/views/Home/Withdraw";
import DepositScreen from "~/views/Home/Deposit";


const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: NewWallet },
    Wallet: { screen: SingleWallet },
    SendReceive: { screen: SendReceive },
    Staking: { screen: Settings },
    Settings: { screen: Settings }
  },
  {
    tabBarComponent: NavigationTab
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeStack: HomeTabNavigator
  },
  {
    headerMode: "none"
  }
);

export default HomeStackNavigator;
