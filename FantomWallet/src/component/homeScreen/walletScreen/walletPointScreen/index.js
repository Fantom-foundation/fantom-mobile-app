import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import style from './style';
import BalanceView from '../../../../general/WalletScreens/BalanceView'
import TransactionView from '../../../../general/WalletScreens/TransactionView';

import { SUCCESS, FAILED, SENT, RECEIVED } from '../../../../common/constants/';

class WalletPointScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointTransactionArr: [
                { type: SENT, amount: '33, 000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '2,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: SENT, amount: '42,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '33,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
            ],
        }
    }
    render() {
        const pointTransactionArr = this.state.pointTransactionArr;
        return (
            <ScrollView style={style.pointViewStyle} showsVerticalScrollIndicator={false}>
                {/* <PointBalanceView pointTransactionArr={pointTransactionArr} />
                <PointTransactionView pointTransactionArr={pointTransactionArr} /> */}
                <BalanceView fantomTransactionArr={pointTransactionArr} />
                <TransactionView fantomTransactionArr={pointTransactionArr} />
            </ScrollView>
        )
    }
}

export default WalletPointScreen;