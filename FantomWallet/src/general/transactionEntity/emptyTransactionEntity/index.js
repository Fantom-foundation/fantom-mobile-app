import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';


import style from './style';
import walletIcon from '../../../images/wallet.png';

class EmptyTransactionEntity extends Component {
    render() {
        return (
            <View style={style.mainViewStyle}>
                <Image source={walletIcon} resizeMode='contain' />
                <Text style={style.headingInfoStyle}> No Transactions </Text>
                <Text style={style.textInfoStyle}>(The wallet will show you recent transactions) </Text>
            </View>
        );
    }
}

export default EmptyTransactionEntity;