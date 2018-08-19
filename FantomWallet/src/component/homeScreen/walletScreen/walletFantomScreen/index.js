import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';

import style from './style';

import FantomBalanceView from './fantomBalanceView/';
import FantomTransactionView from './fantomTransactionView/';

import { SUCCESS, FAILED } from '../../../../common/constants/';

const deviceWidth = Dimensions.get('window').width;
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
        const balanceText = '(1,000\\ = 1.00002312FTM)'
        return (
            <View style={style.mainContainerStyle}>
                <View style={style.amountDisplayStyle}>
                    <Text>{balanceText} </Text>
                </View>
                <ScrollView style={style.fantomViewStyle} showsVerticalScrollIndicator={false}>
                    <FantomBalanceView fantomTransactionArr={fantomTransactionArr} />
                    <FantomTransactionView fantomTransactionArr={fantomTransactionArr} />
                </ScrollView>
            </View>
        )
    }
}

export default WalletFantomScreen;