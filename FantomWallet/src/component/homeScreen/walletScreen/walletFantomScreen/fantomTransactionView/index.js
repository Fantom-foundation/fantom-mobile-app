import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';
import TransactionEntity from '../../../../../general/transactionEntity/';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';

class FantomTransactionView extends Component {
    render() {
        const { fantomTransactionArr } = this.props;
        return (
            <View>
                {fantomTransactionArr.length > 0 && <View style={style.headingCardViewStyle}>
                    <Text style={style.headingCardTextStyle}> Transaction </Text>
                </View>}
                <View >
                    {fantomTransactionArr.length > 0 &&
                        <View><Text style={style.dateViewStyle}> 2018-06-03 </Text></View>}

                    {fantomTransactionArr.length > 0 && fantomTransactionArr.map((transaction, index) => (
                        <TransactionEntity transaction={transaction} />
                    ))}
                    {fantomTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
            </View>
        )
    }
}

export default FantomTransactionView;