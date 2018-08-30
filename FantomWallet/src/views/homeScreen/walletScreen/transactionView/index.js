import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
import EmptyTransactionEntity from './transactionEntity/emptyTransactionEntity/';
import SortMenuCard from '../../../../general/sortMenuCard/';
import DisplayTransaction from './displayTransactions';

import sortMenuIcon from '../../../../images/arrow_With_bar.png'
import Loader from '../../../../general/loader/';

import { SENT, RECEIVED, ALL_TRANSACTION, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants/';

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
        console.log('toggleSortMenu sort item : ', this.state.openSortMenu);
        this.setState({
            openSortMenu: !this.state.openSortMenu
        })
    }
    handleSortMenu(item) {
        console.log('handleSortMenu sort item : ', this.state.openSortMenu);
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
                            zIndex: 1, top: - DEVICE_HEIGHT * 0.5,
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
    renderLoader() {
        if (this.props.isLoading === true) {
            return  <Loader isLoading={this.props.isLoading} loaderStyle={0.25}/> 
        }
    }

    render() {
        const { fantomTransactionArr, publicKey, isLoading } = this.props;
        const selectedSortMenu = this.state.val;
        console.log('publicKey publicKey :', publicKey);


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
                    {this.renderLoader()}
                    <DisplayTransaction
                        fantomTransactionArr={fantomTransactionArr}
                        selectedSortMenu={selectedSortMenu}
                        allTransaction={ALL_TRANSACTION}
                        publicKey={publicKey}
                        isLoading={isLoading} />
                    {isLoading === false && fantomTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
                {this.renderSortMenu()}
            </View>
        )
    }
}

export default TransactionView;