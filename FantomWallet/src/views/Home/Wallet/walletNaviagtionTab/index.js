import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from './style';

/**
 * WalletNavigationTab: This component is meant for displaying navigation tab bar on wallet screen containing list of tab.
 */
class WalletNavigationTab extends PureComponent {
  render() {
    let {
      activeTabIndex,
      index,
      tabIfo,
      tabTextStyle,
      tabStyle,
      activeTabColor,
      inActiveTabColor,
    } = this.props;
    tabStyle = {
      ...style.tabStyle,
      ...tabStyle,
      borderBottomColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
    };

    tabTextStyle = {
      ...style.tabTextStyle,
      ...tabTextStyle,
      fontWeight: activeTabIndex === index ? 'bold' : 'normal',
    };
    return (
      <TouchableOpacity
        style={tabStyle}
        onPress={() => this.props.handleSelectedTab(index, tabIfo.tabRenderInfo)}
      >
        <Text style={tabTextStyle}>{tabIfo.tabRenderInfo}</Text>
      </TouchableOpacity>
    );
  }
}
export default WalletNavigationTab;
