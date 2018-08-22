import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';
import SortMenuCard from '../../../../../general/sortMenuCard/';
import DisplayTransaction from './displayTransactions';

import sortMenuIcon from '../../../../../images/arrow_With_bar.png';


import { SENT, RECEIVED, ALL_TRANSACTION } from '../../../../../common/constants/';

class FantomTransactionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSortMenu: false,
            data: [{ key: 'All Payments', id: 0, sc: ALL_TRANSACTION },
            { key: 'Received Payments', id: 1, sc: RECEIVED },
            { key: 'Sent Payments', id: 2, sc: SENT }
            ],
            index: 0,
            val: ALL_TRANSACTION,
        }
    }

    handleSortMenu(item) {
        console.log('sort item : ', item)
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
        const { fantomTransactionArr } = this.props;
        const selectedSortMenu = this.state.val;

        return (
            <View style={{ flex: 1 }}>
                {fantomTransactionArr.length > 0 &&
                    <View style={style.headingCardViewStyle}>
                        <Text style={style.headingCardTextStyle}> Transactions </Text>
                        <View style={style.transactionSortIconStyle}>
                            <TouchableOpacity onPress={this.handleSortMenu.bind(this)}>
                                <Image source={sortMenuIcon} style={{ width: 33, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                <View style={this.state.openSortMenu ? { opacity: 0.2, } : ''}>
                    <DisplayTransaction
                        fantomTransactionArr={fantomTransactionArr}
                        selectedSortMenu={selectedSortMenu}
                        ALL_TRANSACTION={ALL_TRANSACTION} />
                    {fantomTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
                {this.state.openSortMenu &&
                    <SortMenuCard
                        data={this.state.data}
                        type={'transaction'}
                        index={this.state.index}
                        handleSortMenu={(item) => this.handleSortMenu(item)} />
                }
            </View>
        )
    }
}

export default FantomTransactionView;