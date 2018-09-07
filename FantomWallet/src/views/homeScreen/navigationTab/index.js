import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';

/** * InActive NavigationIcons */

import walletIcon from '../../../images/walletBlack.png';
import sendIcon from '../../../images/sendIcon.png';
import depositIcon from '../../../images/downloading_Black.png';
import activityIcon from '../../../images/running_menBlack.png';

/** * Active NavigationIcons */
import walletWhiteIcon from '../../../images/wallet_white.png';
import sendWhiteIcon from '../../../images/sendWhite.png';
import depositWhiteIcon from '../../../images/downloading_white.png';
import activityWhiteIcon from '../../../images/running_men_White.png';

/*** Color Constants */
import { ACTIVE_TAB_COLOR, WHITE_COLOR } from '../../../common/constants/';

import style from './style';
import Tab from './tab/index';
import TabInfo from './tab/tabInfo/';

/**
 * HomeNavigationBar: This component is meant for rendering navigation tab bar on home screen containing list of tabs.
 */
class HomeNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      tabRenderInfo: 'walletIcon',
      tabIconList: [
        { inActiveIcon: walletIcon, activeIcon: walletWhiteIcon, tabRenderInfo: 'walletIcon' },
        { inActiveIcon: sendIcon, activeIcon: sendWhiteIcon, tabRenderInfo: 'sendIcon' },
        { inActiveIcon: depositIcon, activeIcon: depositWhiteIcon, tabRenderInfo: 'depositIcon' },
      ]
    }
    this._backAndroidPress = this.backAndroidPress.bind(this);
  }
  backAndroidPress() {
    BackHandler.exitApp()
    return true;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._backAndroidPress)
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._backAndroidPress)
  }
  handleSelectedTab = (index, tabRenderInfo) => {
    this.setState({
      activeTabIndex: index,
      tabRenderInfo: tabRenderInfo,
    })
  }

  render() {
    const { tabIconList, activeTabIndex, tabRenderInfo } = this.state;
    const {balance, transactionData, isLoading, onRefresh, navigation} = this.props;
    let renderTabIfo = <TabInfo 
                      tabRenderInfo={tabRenderInfo} 
                      navigation={navigation} 
                      balance={balance}
                      transactionData={transactionData}
                      isLoading={isLoading}
                      onRefresh={onRefresh}
                      />

    let renderTabNavigation = tabIconList.length > 0 && tabIconList.map((tabIfo, index) => (
      <Tab
        key={index}
        activeTabIndex={activeTabIndex}
        index={index}
        activeTabColor={ACTIVE_TAB_COLOR}
        inActiveTabColor={WHITE_COLOR}
        tabIfo={tabIfo}
        handleSelectedTab={this.handleSelectedTab.bind(this)} />
    ))

    return (
      <View style={style.mainContainerStyle}>
        <View style={style.tabInfoStyle}>
          {renderTabIfo}
        </View>
        <View
          style={style.navigationTabStyle}>
          {renderTabNavigation}
        </View>
      </View>
    )
  }
}

HomeNavigationBar.propTypes = {
  balance: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  transactionData: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func
}

export default HomeNavigationBar;
