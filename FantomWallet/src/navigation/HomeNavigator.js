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
import SendReceive from "~/views/SendReceive"; 
import NavigationTab from "~/components/NavigationTab";
import NewWallet from "~/views/Home/NewWallet"
import SingleWallet from "~/views/InsideWallet/SingleWallet";
import SendFTM from "~/views/InsideWallet/SendFTM";
import ScanQR from "~/views/InsideWallet/ScanQR";
// import { store } from "~/redux/store";
// import { getBalance, getHistory } from "~/redux/wallet/actions";

const deviceHeight = Dimensions.get("window").height;

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
