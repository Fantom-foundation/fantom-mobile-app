/* eslint-disable */
import React, { Component } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import style from './style';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';
const isIOS = Platform.OS === 'ios';
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
      <View style={style.imageBackground}>
        <Image source={require('../../images/fantomWhiteIcon.png')} resizeMode="contain" />
        <Image
          style={{
            width: DEVICE_WIDTH * 0.6,
            height: DEVICE_HEIGHT * 0.77,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isIOS ? 0.03 : 0.02,
            right: -((DEVICE_WIDTH * 0.45) / 2),
            position: 'absolute',
          }}
          source={require('../../images/BackgroundIcon.png')}
          resizeMode="contain"
        />
      </View>
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
