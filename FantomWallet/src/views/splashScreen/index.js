import React, { Component } from 'react';
import { ImageBackground, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import style from './style';


class SplashScreen extends Component {

  componentDidMount() {
    const val = this.props.masterKey;
    if (val && val !== '') {
      setTimeout(() => this.props.navigation.navigate('HomeScreen'), 5000)
    } else {
      setTimeout(() => this.props.navigation.navigate('WalletSetup'), 5000)
    }
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

const mapStateToProps = (state) => {
  return {
    masterKey: state.keyReducer.masterKey,
  };
},
  mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
