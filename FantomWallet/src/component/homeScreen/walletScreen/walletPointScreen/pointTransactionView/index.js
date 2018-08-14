import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';
import TransactionEntity from '../../../../../general/transactionEntity/';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';


class PointTransactionView extends Component {
    render() {
        const { pointTransactionArr } = this.props;
        return (
            <View >
                {pointTransactionArr.length > 0 && <View style={style.headingCardViewStyle}>
                    <Text style={style.headingCardTextStyle}> Transaction </Text>
                </View>}
                <View>
                    {pointTransactionArr.length > 0 &&
                        <View><Text style={style.dateViewStyle}> Today </Text></View>}
                    {pointTransactionArr.length > 0 && pointTransactionArr.map((transaction, index) => (
                        <TransactionEntity transaction={transaction} />
                    ))}
                    {pointTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
            </View>
        )
    }
}

export default PointTransactionView;