// import React,{Component} from 'react';
// import {View, Text} from 'react-native';

// import style from './style';

// class WalletPointScreen extends Component {
//      render(){
//          return(
//              <View style={style.pointViewStyle}>
//                  <Text> Point </Text>
//             </View>
//          )
//      }
// }

// export default WalletPointScreen;


import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

import PointBalanceView from './pointBalanceView/';
import PointTransactionView from './pointTransactionView/';

const pointTransactionArr = [
    { type: 'Sent', amount: '33, 000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: 'success' },
    { type: 'Received', amount: '2,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: 'success' },
    { type: 'Sent', amount: '42,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: 'success' },
    { type: 'Sent', amount: '33,000', amountUnit: 'FTP', transactionId: '23JGDGD...D872', transactionStatus: 'success' },
];

class WalletPointScreen extends Component {
    render() {
        return (
            <View style={style.fantomViewStyle}>
                <PointBalanceView pointTransactionArr={pointTransactionArr} />
                <PointTransactionView pointTransactionArr={pointTransactionArr} />
            </View>
        )
    }
}

export default WalletPointScreen;