import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import style from './style';

import BalanceView from '../../../../general/WalletScreens/BalanceView'
import TransactionView from '../../../../general/WalletScreens/TransactionView';

import { SUCCESS, FAILED, SENT, RECEIVED } from '../../../../common/constants/';

class WalletFantomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fantomTransactionArr: [
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: RECEIVED, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
            ],
        }
    }
    render() {
        const balanceText = '(1,000\\ = 1.00002312FTM)';
        const fantomTransactionArr = this.state.fantomTransactionArr;
        return (
            <View style={style.mainContainerStyle}>
                <View style={style.amountDisplayStyle}>
                    <Text style={style.textViewStyle}>{balanceText} </Text>
                </View>
                <ScrollView style={style.fantomViewStyle} showsVerticalScrollIndicator={false}>
                    <BalanceView fantomTransactionArr={fantomTransactionArr} />
                    <TransactionView fantomTransactionArr={fantomTransactionArr} />
                </ScrollView>
            </View>
        )
    }
}

export default WalletFantomScreen;