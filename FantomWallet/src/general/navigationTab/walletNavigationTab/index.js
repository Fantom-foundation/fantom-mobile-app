import React, { Component } from 'react';
import { View } from 'react-native';

/*** Color Constants */
import { ACTIVE_SUB_TAB_COLOR, WHITE_COLOR, } from '../../../common/constants/';

import style from './style';
import WalletTab from './walletTab/';
import WalletTabInfo from './walletTab/walletTabInfo/';


class WalletNavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            tabRenderInfo: 'Point',
            tabIconList: [
                { tabRenderInfo: 'Point' },
                { tabRenderInfo: 'Fantom' },
                // { tabRenderInfo: 'Ethererum' }, /* To render Ethererum tab uncomment 'Ethererum' object  */
            ]
        }
    }

    handleSelectedTab = (index, tabRenderInfo) => {
        this.setState({
            activeTabIndex: index,
            tabRenderInfo: tabRenderInfo,
        })
    }

    render() {
        const { tabIconList, activeTabIndex, tabRenderInfo } = this.state;
        const navigation = this.props.navigation;

        let renderTabIfo = <WalletTabInfo tabRenderInfo={tabRenderInfo} navigation={navigation} />

        let renderTabNavigation = tabIconList.length > 0 && tabIconList.map((tabIfo, index) => (
            <WalletTab
                activeTabIndex={activeTabIndex}
                index={index}
                activeTabColor={ACTIVE_SUB_TAB_COLOR}
                inActiveTabColor={WHITE_COLOR}
                tabIfo={tabIfo}
                handleSelectedTab={this.handleSelectedTab.bind(this)} />
        ))

        return (
            <View style={style.mainContainerStyle}>
                <View style={style.navigationTabStyle}>
                    {renderTabNavigation}
                </View>
                <View style={style.tabInfoStyle}>
                    {renderTabIfo}
                </View>
            </View>
        )
    }
}

export default WalletNavigationBar;
