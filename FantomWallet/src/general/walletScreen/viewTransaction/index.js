import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
import EmptyTransactionEntity from '../../transactionEntity/index';
import SortMenuCard from '../../sortMenuCard/';
import DisplayTransaction from './displayTransactions';

import sortMenuIcon from '../../../images/arrow_With_bar.png'


import { SENT, RECEIVED, ALL_TRANSACTION, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants/';

class TransactionView extends Component {

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

    toggleSortMenu() {
        console.warn('sort item : ', this.state.openSortMenu);
        this.setState({
            openSortMenu: !this.state.openSortMenu
        })
    }
    handleSortMenu(item) {
        console.warn('sort item : ', this.state.openSortMenu);
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

    handleClickOnScreen() {
        if (this.state.openSortMenu) {
            this.setState({
                openSortMenu: false
            })
        }
    }

    renderSortMenu() {
        if (this.state.openSortMenu) {
            return (
                <>
                    <TouchableOpacity
                        style={{
                            width: DEVICE_WIDTH,
                            height: DEVICE_HEIGHT,
                            zIndex: 1, top: -DEVICE_HEIGHT * 0.5,
                            position: 'absolute',
                        }} onPress={this.handleClickOnScreen.bind(this)}></TouchableOpacity>
                    <SortMenuCard
                        data={this.state.data}
                        type={'wallet'}
                        index={this.state.index}
                        handleSortMenu={(item) => this.handleSortMenu(item)} />
                </>
            )
        }
        return null;
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
                            <TouchableOpacity onPress={() => this.toggleSortMenu()}>
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
                {/* {this.state.openSortMenu &&
                    <SortMenuCard
                        data={this.state.data}
                        type={'transaction'}
                        index={this.state.index}
                        handleSortMenu={(item) => this.handleSortMenu(item)} />
                } */}
                {this.renderSortMenu()}
            </View>
        )
    }
}

export default TransactionView;