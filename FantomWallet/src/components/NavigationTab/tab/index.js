// @flow
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import style from './styles';

type Props = {
  activeTabIndex: number,
  index: number,
  activeTabColor: string,
  inActiveTabColor: string,
  tabIfo: {
    route: string,
    icon: string,
  },
  handleSelectedTab: string => void,
};
/**
 * Tab : This component is meant for rendering diffrent tabs on home screen navigation tab bar.
 */
const Tab = ({
  activeTabIndex,
  index,
  activeTabColor,
  inActiveTabColor,
  tabIfo,
  handleSelectedTab,
}: Props) => (
  <TouchableOpacity
    style={{
      ...style.tabStyle,
      backgroundColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
    }}
    onPress={() => handleSelectedTab(tabIfo.route)}
  >
    <Image source={tabIfo.icon} resizeMode="contain" style={style.tabIconStyle} />
  </TouchableOpacity>
);

export default Tab;