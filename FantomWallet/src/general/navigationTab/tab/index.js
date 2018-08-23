import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from './style';

class Tab extends Component {
    
    render() {
        const {activeTabIndex, index, ACTIVE_TAB_COLOR, WHITE_COLOR, tabIfo, tabIconStyle } = this.props;
         const tabStyle = {
             ...style.tabStyle,
             backgroundColor: activeTabIndex === index ? ACTIVE_TAB_COLOR : WHITE_COLOR,
         }

         const iconStyle = {
             ...style.tabIconStyle,
             tabIconStyle
         }
        return (
            <TouchableOpacity
                style={tabStyle}
                onPress={() => this.props.handleSelectedTab(index, tabIfo.tabRenderInfo)}>
                <Image source={activeTabIndex === index ? tabIfo.activeIcon : tabIfo.inActiveIcon} resizeMode='contain' style={iconStyle} />
            </TouchableOpacity>
        )
    }
}
export default Tab;