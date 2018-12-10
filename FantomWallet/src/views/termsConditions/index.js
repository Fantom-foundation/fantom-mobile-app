import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../general/header';
import Button from '../../general/button';
import { DEVICE_HEIGHT } from '../../common/constants';

import style from './style';
import crossButton from '../../images/crossButtonWhite.png';
/**
 * TermsConditions :  This component is meant for displaying legal requirements of the application.
 */

export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onLeftIconPress = this.onLeftIconPress.bind(this);
  }

  onRightIconPress() {
    this.props.navigation.goBack();
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={style.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          text="Terms of Service"
          rightButtonIcon={crossButton}
          isRightBtnImage
          onRightIconPress={this.onRightIconPress}
          // textStyle={{ fontFamily: 'SegoeUI-SemiBold' }}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />
        <WebView source={{ uri: 'http://fantom.foundation' }} />
        <View style={style.footerStyle}>
          <Button text="Confirm" buttonStyle={{ fontFamily: 'SegoeUI' }} />
        </View>
      </View>
    );
  }
}

TermsConditions.propTypes = {
  navigation: PropTypes.object,
};
