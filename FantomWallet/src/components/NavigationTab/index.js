// @flow
import React, { useEffect } from 'react';
import { View, BackHandler } from 'react-native';

/** * Active NavigationIcons */
import routes from '~/navigation/routes';
import walletWhiteIcon from '~/images/WalletFilled.png';
import sendWhiteIcon from '~/images/sendWhite.png';
import depositWhiteIcon from '~/images/downloading_white.png';

/** * Color Constants */
import { INACTIVE_TAB_COLOR } from '~/common/constants';

import style from './styles';
import Tab from './Tab';

const TABS = [
  {
    icon: walletWhiteIcon,
    route: routes.HomeScreen.Wallet,
  },
  {
    icon: sendWhiteIcon,
    route: routes.HomeScreen.Withdraw,
  },
  {
    icon: depositWhiteIcon,
    route: routes.HomeScreen.Deposit,
  },
];

type Props = {
  navigation: {
    navigate: string => void,
    state: {
      index: number,
    },
  },
};

/**
 * HomeNavigationBar: This component is meant for rendering navigation tab bar on home screen containing list of tabs.
 */
const HomeNavigationBar = ({ navigation }: Props) => {
  const backAndroidPress = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroidPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', backAndroidPress);
  }, []);

  const handleSelectedTab = route => {
    navigation.navigate(route);
  };

  const { index: activeTabIndex } = navigation.state;

  return (
    <View style={style.navigationTabStyle}>
      {TABS.map((tabIfo, index) => (
        <Tab
          key={index}
          activeTabIndex={activeTabIndex}
          index={index}
          activeTabColor="rgb(0,177,251)"
          inActiveTabColor={INACTIVE_TAB_COLOR}
          tabIfo={tabIfo}
          handleSelectedTab={handleSelectedTab}
        />
      ))}
    </View>
  );
};

export default HomeNavigationBar;
