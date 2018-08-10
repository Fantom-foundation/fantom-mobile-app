import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

/**
 * To Display DepositTab related tasks
 */
export default class DepositScreen extends Component {
    render() {
        return (
            <View style={style.depositViewStyle}>
                <Text style={style.textViewStyle}>Deposit</Text>
            </View>
        );
    }
}