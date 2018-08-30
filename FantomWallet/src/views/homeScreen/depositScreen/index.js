import React, { Component } from 'react';
import { View } from 'react-native';

import style from './style';

import DepositView from './depositView/index';

export default class DepositScreen extends Component {

    // onRightIconPress() {
    //     this.props.navigation.navigate('AddressBook');
    // }
    render() {
        return (
            <View style={style.depositViewStyle}>
                <View style={style.depositScreenStyle}>
                    <DepositView />
                </View>
            </View>
        );
    }
}