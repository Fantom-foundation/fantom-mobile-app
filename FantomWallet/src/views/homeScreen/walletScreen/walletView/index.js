import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

/*** Color Constants */
import { ACTIVE_SUB_TAB_COLOR, WHITE_COLOR, SENT, RECEIVED, SUCCESS, FAILED, } from '../../../../common/constants/';

import style from './style';
import WalletNaviagtionTab from '../walletNaviagtionTab/';
// import WalletTabInfo from './walletTab/walletTabInfo/';
import WalletViewInfo from '../walletViewInfo/';

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
            transactionData: [],
            isLoading: true,
        }
        this.loadTransactionData = this.loadTransactionData.bind(this);
        //  this.state.fantomTransactionArr = this.getTransactionsFromApiAsync(this.getPublicKey());
        if (this.props.publicKey) {
            this.getTransactionsFromApiAsync(this.props.publicKey);
        }
    }

    // { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    getTransactionsFromApiAsync(address) {
        const dummyAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
        fetch('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + dummyAddress + '&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('response of dummyAddress', responseJson);
                if (responseJson && responseJson.result && responseJson.result.length) {
                    this.loadTransactionData(responseJson);
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getPublicKey() {
        const pubKey = AsyncStorage.getItem('publicKey');
        console.log('getPublicKey');
        console.log(pubKey);
        return pubKey;
    }

    loadTransactionData(responseJson) {
        let transactionData = [];
        // let publicKey = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
        let publicKey = this.props.publicKey;
        let type = '';
        let transactionId = '';

        for (let data of responseJson.result) {
            if (publicKey === data.from) {
                type = SENT;
                transactionId = data.to;
            } else if (publicKey === data.to) {
                type = RECEIVED;
                transactionId = data.from;
            }
            (data.isError === "0") ? transactionStatus = SUCCESS : transactionStatus = FAILED;
            if (publicKey === data.from || publicKey === data.to) {
                transactionData.push({
                    type: type,
                    amount: data.value,
                    transactionId: transactionId,
                    transactionStatus: transactionStatus,
                    amountUnit: 'FTM',
                    from: data.from,
                    to: data.to,
                    isError: data.isError
                });
            }
        }
        this.setState({
            transactionData,
            isLoading: false,
        })
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
        const navigation = this.props.navigation;
        return (
            <View style={style.mainContainerStyle}>
                {/* <View style={style.navigationTabStyle}>
                    {this.renderTabNavigation()}
                </View> */}
                <View style={style.tabInfoStyle}>
                    <WalletViewInfo
                        navigation={navigation}
                        selectedTab={this.state.tabRenderInfo}
                        transactionData={this.state.transactionData}
                        balance={this.props.balance}
                        isLoading={this.state.isLoading} />
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
