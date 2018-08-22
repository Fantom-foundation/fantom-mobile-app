import React, { Component } from 'react';
import { View, Image } from 'react-native';

class SplashScreen extends Component {
    render() {
        // setTimeout(() => this.props.navigation.navigation('CreateWallet'), 1000)
        return (
            <View >
                <Image source={require('../../images/fantom-logo.png')} 
                    resizeMode='contain' />
            </View>
        );
    }
}