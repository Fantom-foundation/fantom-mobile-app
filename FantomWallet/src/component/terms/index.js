import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Styles from './styles';

class CreateWallet extends Component {
    render() {
        return (
            <View style={ Styles.mainContainer}>
                <View style={ Styles.headerContainer}>
                    <Text style={ Styles.headerText}>FANTOM</Text>
                </View>
            </View>
        );
    }
}

export default CreateWallet;