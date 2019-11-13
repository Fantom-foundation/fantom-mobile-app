// @flow
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import styles from './styles';

type Props = {
  activeTabIndex: number,
  index: number,
  activeTabColor: string,
  inActiveTabColor: string,
  tabInfo: {
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
  tabInfo,
  handleSelectedTab,
}: Props) => (
    <TouchableOpacity
      style={{
        ...styles.tabStyle,
        backgroundColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
      }}
      onPress={() => handleSelectedTab(tabInfo.route)}
    >
      <Image source={tabInfo.icon} resizeMode="contain" style={styles.tabIconStyle} />
    </TouchableOpacity>
  );

export default Tab;
