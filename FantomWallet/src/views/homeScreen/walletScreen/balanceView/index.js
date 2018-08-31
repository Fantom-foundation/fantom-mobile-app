import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';
/**
 * BalanceView: This component is meant for rendering balance of wallet on wallet screen.
 */
class BalanceView extends Component {

    render() {

        let { fantomTransactionArr, balance } = this.props;

        let balanceTextThree = 'FTM';
        let balanceTextFour = '122,000\\';

        // if (balance === '0') {
        //     balance = '00.00000000';
        //     balanceTextFour = '0,000\\';
        // }

        return (
            <View style={style.fantomBalanceView}>
                <View style={style.balanceContainer}>
                    <View style={style.balanceViewText}>
                        <Text numberOfLines={1} style={style.balanceViewTextOne}>{balance} FTM</Text>
                        {/* <Text style={style.balanceUnitText}>{balanceTextThree}</Text> */}
                    </View>
                    <View style={style.balanceTextTwo}>
                        <Text style={style.balanceTextStyle}> {balanceTextFour} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default BalanceView;