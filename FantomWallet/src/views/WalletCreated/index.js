import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SuccessScreen from '../../general/SuccessScreen';
class WalletCreated extends Component {
    render() {
        return (
            <SuccessScreen text="Wallet created!"></SuccessScreen>
        );
    }
}

export default WalletCreated;
