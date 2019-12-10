import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SuccessScreen from '../../general/SuccessScreen';
class WalletImported extends Component {
    onCreateNewWallet() {
        this.props.navigation.navigate('CaptionOutput');
    }
    render() {
        return (
            <SuccessScreen text="Wallet imported!"></SuccessScreen>
        );
    }
}

export default WalletImported;
