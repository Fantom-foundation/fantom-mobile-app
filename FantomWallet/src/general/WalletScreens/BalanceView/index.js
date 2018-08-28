import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

class FantomBalanceView extends Component {

    render() {

        const { fantomTransactionArr } = this.props;

        let balanceTextOne = '(1,000\\ = 1.00002312FTM)';
        let balanceTextTwo = '12.23532454';
        let balanceTextThree = 'FTM';
        let balanceTextFour = '122,000\\';

        if (fantomTransactionArr.length === 0) {
            balanceTextOne = '(1,000\\ = 2312FTM)';
            balanceTextTwo = '00.00000000';
            balanceTextFour = '0,000\\';
        }

        return (
            <View style={style.fantomBalanceView}>
                <View style={style.balanceContainer}>
                    <View style={style.balanceViewText}>
                        <Text style={style.balanceViewTextOne}> {balanceTextTwo} </Text>
                        <Text style={style.balanceUnitText}> {balanceTextThree} </Text>
                    </View>
                    <View style={style.balanceTextTwo}>
                        <Text style={style.balanceTextStyle}> {balanceTextFour} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default FantomBalanceView;