// @flow
import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

type Props = {
  activeTabIndex: number,
  index: number,
  tabIfo: {
    tabRenderInfo: string,
  },
  tabTextStyle: { [key: string]: string },
  tabStyle: { [key: string]: string },
  activeTabColor: string,
  inActiveTabColor: string,
  handleSelectedTab: (number, string) => {},
};

/**
 * DepositNavigationTab: This component is meant for displaying navigation tab bar on Deposit screen containing list of tab.
 */
const DepositNavigationTab = ({
  activeTabIndex,
  index,
  tabIfo,
  tabTextStyle,
  tabStyle,
  activeTabColor,
  inActiveTabColor,
  handleSelectedTab,
}: Props) => (
    <TouchableOpacity
      style={{
        ...styles.tabStyle,
        ...tabStyle,
        borderBottomColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
      }}
      onPress={() => handleSelectedTab(index, tabIfo.tabRenderInfo)}
    >
      <Text
        style={{
          ...styles.tabTextStyle,
          ...tabTextStyle,
          fontWeight: activeTabIndex === index ? 'bold' : 'normal',
        }}
      >
        {tabIfo.tabRenderInfo}
      </Text>
    </TouchableOpacity>
  );

export default DepositNavigationTab;