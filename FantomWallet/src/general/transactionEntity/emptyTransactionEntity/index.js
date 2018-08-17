import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';

class EmptyTransactionEntity extends Component {
    render() {
        return (
            <View style={style.mainViewStyle}>
                <MaterialIcons name='account-balance-wallet' size={65} color='black' />
                <Text style={style.headingInfoStyle}> No Transactions </Text>
                <Text style={style.textInfoStyle}>(The wallet will show you recent transactions) </Text>
            </View>
        );
    }
}

export default EmptyTransactionEntity;