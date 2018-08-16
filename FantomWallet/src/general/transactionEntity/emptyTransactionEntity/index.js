import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';

class EmptyTransactionEntity extends Component {
    render() {
        return (
            <View style={style.mainViewStyle}>
                <Text style={style.headingInfoStyle}> No Transaction </Text>
                <MaterialIcons name='account-balance-wallet' size={65} color='black' />
                <Text >The wallet will show your recent transaction. </Text>
            </View>
        );
    }
}

export default EmptyTransactionEntity;