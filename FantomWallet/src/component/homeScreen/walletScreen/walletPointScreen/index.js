import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import style from './style';

import PointBalanceView from './pointBalanceView/';
import PointTransactionView from './pointTransactionView/';

import { SUCCESS, FAILED } from '../../../../common/constants/';

const pointTransactionArr = [
    { type: 'Sent', amount: '33, 000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Received', amount: '2,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
    { type: 'Sent', amount: '42,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
    { type: 'Sent', amount: '33,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
];

class WalletPointScreen extends Component {
    render() {
        return (
            <ScrollView style={style.pointViewStyle} showsVerticalScrollIndicator={false}>
                <PointBalanceView pointTransactionArr={pointTransactionArr} />
                <PointTransactionView pointTransactionArr={pointTransactionArr} />
            </ScrollView>
        )
    }
}

export default WalletPointScreen;