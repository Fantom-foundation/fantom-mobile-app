// @flow
import React, { useEffect } from "react";
import { View, BackHandler } from "react-native";

/** * Active NavigationIcons */
import { NavigationService, routes } from "~/navigation/helpers";
import homeIcon from "~/images/tabHome.png";
import prefrencesIcon from "~/images/tabPrefrences.png";
import stakeIcon from "~/images/tabStake.png";
import walletIcon from "~/images/tabWallet.png";
import quickPayIcon from "~/images/tabQuickPay.png";
import { Colors } from "../../theme";

import styles from "./styles";
import Tab from "./tab";

const TABS = [
  {
    icon: homeIcon,
    route: routes.HomeScreen.Home
  },
  {
    icon: walletIcon,
    route: routes.HomeScreen.Wallet
  },
  {
    icon: quickPayIcon,
    route: routes.HomeScreen.SendReceive
  },

  {
    icon: stakeIcon,
    route: routes.HomeScreen.Staking
  },
  {
    icon: prefrencesIcon,
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
    navigation.goBack()
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAndroidPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAndroidPress);
  }, []);

  const handleSelectedTab = route => {
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
