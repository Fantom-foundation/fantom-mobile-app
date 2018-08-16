import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import style from './style';
import TransactionEntity from '../../../../../general/transactionEntity/';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';
import SortMenuCard from '../../../../../general/sortMenuCard/';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

class PointTransactionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSortMenu: false,
        }
    }

    handleSortMenu() {
        console.log('hjfgajsfghskfjhsadfk', this.state.openSortMenu);
        this.setState((previousState) => ({ openSortMenu: !previousState.openSortMenu }));
    }

    render() {
        const { pointTransactionArr } = this.props;
        return (
            <View >
                {pointTransactionArr.length > 0 &&
                    <View style={style.headingCardViewStyle}>
                        <Text style={style.headingCardTextStyle}> Transaction </Text>
                        <View style={style.transactionSortIconStyle}>
                            <TouchableOpacity onPress={this.handleSortMenu.bind(this)}>
                                <FontAwesome name='sort-amount-desc' size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                <View>
                    {pointTransactionArr.length > 0 &&
                        <View><Text style={style.dateViewStyle}> Today </Text></View>}
                    {pointTransactionArr.length > 0 && pointTransactionArr.map((transaction, index) => (
                        <TransactionEntity transaction={transaction} />
                    ))}
                    {pointTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
                {
                   this.state.openSortMenu && <SortMenuCard />
                }
            </View>
        )
    }
}

export default PointTransactionView;