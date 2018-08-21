import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
import TransactionEntity from '../../../../../general/transactionEntity/';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';
import SortMenuCard from '../../../../../general/sortMenuCard/';


import sortMenuIcon from '../../../../../images/arrow_With_bar.png'

class PointTransactionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSortMenu: false,
            data: [{ key: 'All Payments', id: 0, sc: 'ap' },
            { key: 'Received Payments', id: 1, sc: 'rp' },
            { key: 'Sent Payments', id: 2, sc: 'sp' }
            ],
            index: 0
        }
    }

    handleSortMenu(item) {

        this.setState({
            openSortMenu: !this.state.openSortMenu
        })
        if (item && item.sc) {
            this.setState({
                val: item.sc,
                index: item.id
            })
        }
    }

    render() {
        const { pointTransactionArr } = this.props;
        return (
            <View >
                {pointTransactionArr.length > 0 &&
                    <View style={style.headingCardViewStyle}>
                        <Text style={style.headingCardTextStyle}> Transactions </Text>
                        <View style={style.transactionSortIconStyle}>
                            <TouchableOpacity onPress={this.handleSortMenu.bind(this)}>
                                <Image source={sortMenuIcon} style={{ width: 33, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                <View style={this.state.openSortMenu ? { opacity: 0.2, } : ''}>
                    {pointTransactionArr.length > 0 && pointTransactionArr.map((transaction, index) => (
                        <TransactionEntity transaction={transaction} />
                    ))}
                    {pointTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
                {
                    this.state.openSortMenu && <SortMenuCard data={this.state.data} type={'wallet'} index={this.state.index} handleSortMenu={(item) => this.handleSortMenu(item)} />
                }
            </View>
        )
    }
}

export default PointTransactionView;