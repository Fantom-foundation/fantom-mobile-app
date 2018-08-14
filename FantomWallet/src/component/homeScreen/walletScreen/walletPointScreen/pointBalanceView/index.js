import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

class PointBalanceView extends Component {
    render() {
        const { pointTransactionArr } = this.props;

        let balanceTextOne = '8,230,000';
        let balanceTextTwo = 'FTP';
        let balanceTextThree = '8,230,000';
        let balanceTextFour = 'FTM';

        if (pointTransactionArr.length === 0) {
            balanceTextOne = '00.00000000';
            balanceTextThree = '0,000\\';
        }

        return (
            <View style={style.pointBalanceView}>
                <View style={style.balanceViewText}>
                    <Text style={style.balanceViewTextOne}> {balanceTextOne} </Text>
                    <Text> {balanceTextTwo} </Text>
                </View>
                <View style={style.balanceTextRowStyle}>
                    <Text style={style.balanceTextStyle}> {balanceTextThree} </Text>
                    <Text style={style.balanceTextUnitStyle}> {balanceTextFour} </Text>
                </View>
            </View>
        )
    }
}

export default PointBalanceView;