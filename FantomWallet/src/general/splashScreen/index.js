import React, { Component } from 'react';
import { ImageBackground, Image, AsyncStorage } from 'react-native';

import style from './style';


class SplashScreen extends Component {

    componentDidMount() {
        AsyncStorage.getItem('masterPrivateKey').then((val) => {
            if (val && val !== '') {
                setTimeout(() => this.props.navigation.navigate('HomeScreen'), 5000)
            } else {
                // this.props.navigation.navigate('WalletSetup')
                setTimeout(() => this.props.navigation.navigate('WalletSetup'), 5000)
            }
        });
    }

    render() {
        return (
            <ImageBackground
                style={style.imageBackground}
                source={require('../../images/background.png')}
                imageStyle={{ resizeMode: 'cover' }}>
                <Image source={require('../../images/fantom-logo.png')}
                    resizeMode='contain' />
            </ImageBackground >
        );
    }
}

export default SplashScreen;

