// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from './style';

type Props = {
  activeTabIndex: number,
  index: number,
  tabIfo: { tabRenderInfo: string },
  tabTextStyle: { [string]: string },
  tabStyle: { [string]: string },
  activeTabColor: string,
  inActiveTabColor: string,
  handleSelectedTab: (number, string) => void,
};

/**
 * WalletNavigationTab: This component is meant for displaying navigation tab bar on wallet screen containing list of tab.
 */
export const WalletNavigationTab = ({
  activeTabIndex,
  index,
  tabIfo,
  tabTextStyle,
  tabStyle,
  activeTabColor,
  inActiveTabColor,
  handleSelectedTab,
}: Props) => {
  const handleTab = () => handleSelectedTab(index, tabIfo.tabRenderInfo);

  return (
    <TouchableOpacity
      style={{
        ...style.tabStyle,
        ...tabStyle,
        borderBottomColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
      }}
      onPress={handleTab}
    >
      <Text
        style={{
          ...style.tabTextStyle,
          ...tabTextStyle,
          fontWeight: activeTabIndex === index ? 'bold' : 'normal',
        }}
      >
        {tabIfo.tabRenderInfo}
      </Text>
    </TouchableOpacity>
  );
};
export default WalletNavigationTab;
