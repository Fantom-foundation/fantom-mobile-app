import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

/*** Color Constants */
import { ACTIVE_SUB_TAB_COLOR, WHITE_COLOR, SENT, RECEIVED, SUCCESS, FAILED, } from '../../../../common/constants/';

import style from './style';
import WalletNaviagtionTab from '../walletNaviagtionTab/';
// import WalletTabInfo from './walletTab/walletTabInfo/';
import WalletViewInfo from '../walletViewInfo/';
const Web3 = require('web3');

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
            ],

        }
    }

    handleSelectedTab = (index, tabRenderInfo) => {
        this.setState({
            activeTabIndex: index,
            tabRenderInfo: tabRenderInfo,
        })
    }

    renderTabNavigation() {
        const { tabIconList, activeTabIndex } = this.state;
        return (
            <>
                {
                    tabIconList.length > 0 && tabIconList.map((tabIfo, index) => (
                        <WalletNaviagtionTab
                            key={index}
                            activeTabIndex={activeTabIndex}
                            index={index}
                            activeTabColor={ACTIVE_SUB_TAB_COLOR}
                            inActiveTabColor={WHITE_COLOR}
                            tabIfo={tabIfo}
                            handleSelectedTab={this.handleSelectedTab.bind(this)} />
                    ))
                }
            </>
        )
    }

    render() {
        const { balance, transactionData, isLoading, navigation, onRefresh } = this.props;

        return (
            <View style={style.mainContainerStyle}>
                {/* <View style={style.navigationTabStyle}>
                    {this.renderTabNavigation()}
                </View> */}
                <View style={style.tabInfoStyle}>
                    <WalletViewInfo
                        navigation={navigation}
                        selectedTab={this.state.tabRenderInfo}
                        transactionData={transactionData}
                        balance={balance}
                        isLoading={isLoading}
                        onRefresh={onRefresh} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        publicKey: state.keyReducer.publicKey,
    };
},
    mapDispatchToProps = (dispatch) => {
        return {
        };
    };
export default connect(mapStateToProps, mapDispatchToProps)(WalletNavigationBar);
