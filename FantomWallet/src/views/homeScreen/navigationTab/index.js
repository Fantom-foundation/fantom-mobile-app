import React, { Component } from 'react';
import { Image, View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';

/** * InActive NavigationIcons */
import walletIcon from '../../../images/walletBlack.png';
import sendIcon from '../../../images/sendIcon.png';
import depositIcon from '../../../images/downloading_Black.png';

/** * Active NavigationIcons */
import walletWhiteIcon from '../../../images/WalletFilled.png';
import sendWhiteIcon from '../../../images/sendWhite.png';
import depositWhiteIcon from '../../../images/downloading_white.png';

/** * Color Constants */
import { ACTIVE_TAB_COLOR } from '../../../common/constants';

import style from './style';
import Tab from './tab/index';
import TabInfo from './tab/tabInfo';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';
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
        { inActiveIcon: walletWhiteIcon, activeIcon: walletWhiteIcon, tabRenderInfo: 'walletIcon' },
        { inActiveIcon: sendWhiteIcon, activeIcon: sendWhiteIcon, tabRenderInfo: 'sendIcon' },
        {
          inActiveIcon: depositWhiteIcon,
          activeIcon: depositWhiteIcon,
          tabRenderInfo: 'depositIcon',
        },
      ],
    };
    this.backAndroidPress = this.backAndroidPress.bind(this);
    this.handleSelectedTab = this.handleSelectedTab.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAndroidPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroidPress);
  }

  backAndroidPress() {
    BackHandler.exitApp();
    return true;
  }

  handleSelectedTab(index, tabRenderInfo) {
    this.props.onTabChange(index);
    this.setState({
      activeTabIndex: index,
      tabRenderInfo,
    });
  }

  render() {
    const { tabIconList, activeTabIndex, tabRenderInfo } = this.state;
    const {
      balance,
      transactionData,
      isLoading,
      onRefresh,
      navigation,
      maxFantomBalance,
    } = this.props;
    const renderTabIfo = (
      <TabInfo
        tabRenderInfo={tabRenderInfo}
        navigation={navigation}
        balance={balance}
        maxFantomBalance={maxFantomBalance}
        transactionData={transactionData}
        isLoading={isLoading}
        onRefresh={onRefresh}
      />
    );

    const renderTabNavigation =
      tabIconList.length > 0 &&
      tabIconList.map((tabIfo, index) => (
        <Tab
          key={index}
          activeTabIndex={activeTabIndex}
          index={index}
          activeTabColor={ACTIVE_TAB_COLOR}
          inActiveTabColor="rgb(0,177,251)"
          tabIfo={tabIfo}
          handleSelectedTab={this.handleSelectedTab}
        />
      ));

    return (
      <View style={style.mainContainerStyle}>
        <View style={style.tabInfoStyle}>{renderTabIfo}</View>
        <View style={style.navigationTabStyle}>{renderTabNavigation}</View>

        <Image
          style={{
            width: DEVICE_WIDTH * 0.4,
            height: DEVICE_HEIGHT * 0.77,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.03,
            right: -((DEVICE_WIDTH * 0.4) / 2),
            top: 0,
            position: 'absolute',
          }}
          source={require('../../../images/BackgroundIcon.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}

HomeNavigationBar.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transactionData: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func,
};

export default HomeNavigationBar;
