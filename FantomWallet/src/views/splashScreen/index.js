/* eslint-disable */
import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

/**
 * SplashScreen: Splash Screen for app.
 */
class SplashScreen extends Component {
  /**
   * Render different screens based on user is already a registered user or not.
   */
  componentDidMount() {
    const val = this.props.masterKey;
    const privateKey = this.props.privateKey;
    if (val && val !== '' && privateKey && privateKey !== '') {
      setTimeout(() => this.props.navigation.navigate('HomeScreen'), 5000);
    } else {
      setTimeout(() => this.props.navigation.navigate('WalletSetup'), 5000);
    }
  }

  render() {
    return (
      <ImageBackground
        style={style.imageBackground}
        source={require('../../images/background.png')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        {/* <Image source={require('../../images/fantom-logo.png')} resizeMode="contain" /> */}
        <Image source={require('../../images/fantomWhiteIcon.png')} resizeMode="contain" />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  masterKey: state.keyReducer.masterKey,
  privateKey: state.keyReducer.privateKey,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
