import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
import EmptyTransactionEntity from '../../../../../general/transactionEntity/emptyTransactionEntity/';
import SortMenuCard from '../../../../../general/sortMenuCard/';
import DisplayTransaction from './displayTransactions';
import { Dimensions } from 'react-native';

import { SENT, RECEIVED, ALL_TRANSACTION } from '../../../../../common/constants/';
import sortMenuIcon from '../../../../../images/arrow_With_bar.png';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class PointTransactionView extends Component {
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
        if(this.state.openSortMenu){
          this.setState({
            openSortMenu: !this.state.openSortMenu
          })
        }
      }


    renderSortMenu() {
        if (this.state.openSortMenu) {
            return (
                <>
                <View style={{width:deviceWidth,height:deviceHeight,zIndex:1,top:-deviceHeight*0.5,position:'absolute'}}></View>
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
        const { pointTransactionArr } = this.props;
        const selectedSortMenu = this.state.val;

        return (
            <TouchableOpacity activeOpacity={1}style={style.withdrawViewStyle} onPress={() => this.handleClickOnScreen()}>
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
                    <DisplayTransaction
                        pointTransactionArr={pointTransactionArr}
                        selectedSortMenu={selectedSortMenu}
                        ALL_TRANSACTION={ALL_TRANSACTION} />
                    {pointTransactionArr.length === 0 && <EmptyTransactionEntity />}
                </View>
               { this.renderSortMenu() }
            </TouchableOpacity>
        )
    }
}

export default PointTransactionView;