import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import style from './style';
import TransactionEntity from '../../../../../general/transactionEntity/';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';

class FantomTransactionView extends Component {
    render() {
        const { fantomTransactionArr } = this.props;
        return (
            <View>
                {fantomTransactionArr.length > 0 &&
                    <View style={style.headingCardViewStyle}>
                        <Text style={style.headingCardTextStyle}> Transaction </Text>
                        <View style={style.transactionSortIconStyle}>
                            <TouchableOpacity>
                                <FontAwesome name='sort-amount-desc' size={20} />
                            </TouchableOpacity>
                        </View>
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