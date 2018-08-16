import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

import FantomBalanceView from './fantomBalanceView/';
import FantomTransactionView from './fantomTransactionView/';

import { SUCCESS, FAILED } from '../../../../common/constants/';

const fantomTransactionArr = [
    { type: 'Sent', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Received', amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Received', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Sent', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
    { type: 'Sent', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Received', amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
    { type: 'Received', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
    { type: 'Sent', amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
];

class WalletFantomScreen extends Component {
    render() {
        return (
            <View style={style.fantomViewStyle}>
                <FantomBalanceView fantomTransactionArr={fantomTransactionArr} />
                <FantomTransactionView fantomTransactionArr={fantomTransactionArr} />
            </View>
        )
    }
}

export default WalletFantomScreen;