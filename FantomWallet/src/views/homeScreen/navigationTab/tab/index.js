import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
/**
 * Tab : This component is meant for rendering diffrent tabs on home screen navigation tab bar.
 */
class Tab extends PureComponent {
  render() {
    const {
      activeTabIndex,
      index,
      activeTabColor,
      inActiveTabColor,
      tabIfo,
      tabIconStyle,
    } = this.props;
    const tabStyle = {
      ...style.tabStyle,
      backgroundColor: activeTabIndex === index ? activeTabColor : inActiveTabColor,
    };

    const iconStyle = {
      ...style.tabIconStyle,
      ...tabIconStyle,
    };
    return (
      <TouchableOpacity
        style={tabStyle}
        onPress={() => this.props.handleSelectedTab(index, tabIfo.tabRenderInfo)}
      >
        <Image
          source={activeTabIndex === index ? tabIfo.activeIcon : tabIfo.inActiveIcon}
          resizeMode="contain"
          style={iconStyle}
        />
      </TouchableOpacity>
    );
  }
}
Tab.propTypes = {
  activeTabIndex: PropTypes.number,
  index: PropTypes.number,
  activeTabColor: PropTypes.string,
  inActiveTabColor: PropTypes.string,
  tabIfo: PropTypes.object,
  tabIconStyle: PropTypes.object,
};
export default Tab;
