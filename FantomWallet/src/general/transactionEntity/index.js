import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

const sent = 'Sent';
const received = 'Received';

import { SUCCESS } from '../../common/constants/';


class TransacationEntity extends Component {
    render() {
        const { transaction } = this.props;
        return (
            <View style={style.transactionCardStyle}>
                <View style={style.rowOneStyle}>
                    <Text> {transaction.type} {(transaction.type === sent ? ' To' : ' From')} </Text>
                    <View style={style.rowOneViewStyle}>
                        <Text style={style.rowOneTextStyle}> {(transaction.type === sent ? '-' : '+')} {transaction.amount}</Text>
                        <Text> {transaction.amountUnit} </Text>
                    </View>
                </View>
                <View style={style.rowTwoStyle}>
                    {/* <Text> {(transaction.type === sent ? 'To' : 'From')}</Text> */}
                    <Text> {transaction.transactionId}</Text>
                    <View style={style.rowTwoViewStyle}>
                        <Text style={(transaction.transactionStatus === SUCCESS) ? style.successTextStyle : style.failureTextStyle}> {transaction.transactionStatus} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default TransacationEntity;