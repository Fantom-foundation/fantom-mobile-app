import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';
import { SUCCESS, SENT } from '../../../../../common/constants/';


class TransacationEntity extends Component {
    render() {
        const { transaction } = this.props;
        return (
            <View style={style.transactionCardStyle}>
                <View style={style.rowOneStyle}>
                    <Text style={style.transactionTypeStyle}> {transaction.type} {(transaction.type === SENT ? ' To' : ' From')} </Text>
                    <View style={style.rowOneViewStyle}>
                        <Text style={style.rowOneTextStyle}> {(transaction.type === SENT ? '-' : '+')} {transaction.amount}</Text>
                        <Text style={style.unitStyle}> {transaction.amountUnit} </Text>
                    </View>
                </View>
                <View style={style.rowTwoStyle}>
                    <Text style={style.transactionIdStyle}> {transaction.transactionId}</Text>
                    <View style={style.rowTwoViewStyle}>
                        <Text style={(transaction.transactionStatus === SUCCESS) ? style.successTextStyle : style.failureTextStyle}> {transaction.transactionStatus} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default TransacationEntity;