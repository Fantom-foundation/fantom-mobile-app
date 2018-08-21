import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import style from './style';

import PointBalanceView from './pointBalanceView/';
import PointTransactionView from './pointTransactionView/';

import { SUCCESS, FAILED } from '../../../../common/constants/';

class WalletPointScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointTransactionArr: [
                { type: 'Sent', amount: '33, 000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: 'Received', amount: '2,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: 'Sent', amount: '42,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: 'Sent', amount: '33,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
            ],
        }
    }
    render() {
        const pointTransactionArr = this.state.pointTransactionArr;
        return (
            <ScrollView style={style.pointViewStyle} showsVerticalScrollIndicator={false}>
                <PointBalanceView pointTransactionArr={pointTransactionArr} />
                <PointTransactionView pointTransactionArr={pointTransactionArr} />
            </ScrollView>
        )
    }
}

export default WalletPointScreen;