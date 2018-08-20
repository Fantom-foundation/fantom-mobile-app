import React, { Component } from 'react';
import { View, Text } from 'react-native';

import style from './style';

import DepositNavigationTab from '../../../general/navigationTab/depositNavigationTab/';
import WalletNavigationTab from '../../../general/navigationTab/walletNavigationTab/';
/**
 * To Display DepositTab related tasks
 */
export default class DepositScreen extends Component {
    render() {
        return (
            <View style={style.depositViewStyle}>
                <Text style={style.textViewStyle}>Deposit</Text>
                {/* <DepositNavigationTab /> */}

                {/* <View style={style.depositScreenStyle}>
                    <DepositNavigationTab />
                </View> */}

            </View>
        );
    }
}