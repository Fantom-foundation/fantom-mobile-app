import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
class WalletImported extends Component {
    onCreateNewWallet() {
        this.props.navigation.navigate('CaptionOutput');
    }
    render() {
        return (<View
            style={styles.imageBackground}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.mainContainer}>
                <Text style={styles.walletText}>Wallet imported!</Text>
                <FontAwesome name="check" size={100} color="green" style={styles.checkIcon}></FontAwesome>
            </View>
        </View >
        );
    }
}

export default WalletImported;
