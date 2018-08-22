import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';

import style from './style'; 

class SplashScreen extends Component {
    render() {
        setTimeout(() => this.props.navigation.navigate('CreateWallet'), 5000)
        return (
            <ImageBackground
                style={style.imageBackground}
                source={require('../../images/background.png')}
                imageStyle={{ resizeMode: 'cover' }}>
                <Image  source={require('../../images/fantom-logo.png')}
                    resizeMode='contain' />
            </ImageBackground >
        );
    }
}

export default SplashScreen;

