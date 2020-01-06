// @flow
import React, { useEffect } from "react";
import { View, BackHandler } from "react-native";

/** * Active NavigationIcons */
import { NavigationService, routes } from "~/navigation/helpers";
import { Colors } from "../../theme";
import {
  HomeIcon,
  WalletTabIcon,
  OppositeArrow,
  MoneyBagIcon,
  Avatar
} from "~/images";
import { delegateByAddresses } from "~/redux/staking/actions";
import { store } from "~/redux/store";

import styles from "./styles";
import Tab from "./tab";

const TABS = [
  {
    icon: HomeIcon,
    route: routes.HomeScreen.Home
  },
  {
    icon: WalletTabIcon,
    route: routes.HomeScreen.Wallet
  },
  {
    icon: OppositeArrow,
    route: routes.HomeScreen.SendReceive
  },

  {
    icon: MoneyBagIcon,
    route: routes.HomeScreen.Staking
  },
  {
    icon: Avatar,
    route: routes.HomeScreen.Settings
  }
];

type Props = {
  navigation: {
    navigate: string => void,
    goBack: () => void,
    state: {
      index: number
    }
  }
};

/**
 * HomeNavigationBar: This component is meant for rendering navigation tab bar on home screen containing list of tabs.
 */
const HomeNavigationBar = ({ navigation }: Props) => {
  const backAndroidPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAndroidPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAndroidPress);
  }, []);

  const handleSelectedTab = route => {
    if (route === routes.HomeScreen.Staking) {
      store.dispatch(delegateByAddresses());
    }
    NavigationService.navigate(route);
  };

  const { index: activeTabIndex } = navigation.state;

  return (
    <View style={styles.navigationTabStyle}>
      {TABS.map((tabInfo, index) => (
        <Tab
          key={tabInfo.route}
          activeTabIndex={activeTabIndex}
          index={index}
          inActiveTabColor={Colors.royalBlue}
          tabInfo={tabInfo}
          handleSelectedTab={handleSelectedTab}
        />
      ))}
    </View>
  );
};

export default HomeNavigationBar;
