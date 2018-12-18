import React, { Component } from 'react';
import { View, WebView, StatusBar, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../general/header';
import Button from '../../general/button';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';

import style from './style';

import crossButton from '../../images/crossButtonWhite.png';

/**
 * PrivacyPolicy :  This component is meant for displaying Privacy Policy for users of the application.
 */
export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onLeftIconPress = this.onLeftIconPress.bind(this);
  }

  /**
   * onRightIconPress() :  This function is meant for actions to be performed when clicked on right side button on Header Bar.
   */
  onRightIconPress() {
    this.props.navigation.goBack();
  }

  /**
   * onLeftIconPress() :  This function is meant for actions to be performed when clicked on left side button on Header Bar.
   */
  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const headerHeight = DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT;
    return (
      <View style={style.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          text="Privacy Policy"
          rightButtonIcon={crossButton}
          isRightBtnImage
          onRightIconPress={this.onRightIconPress}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: headerHeight,
          }}
        />
        <WebView source={{ uri: 'http://fantom.foundation' }} onLoad={() => this.hideSpinner()} />
        {visible && (
          <View
            style={{
              height: DEVICE_HEIGHT - headerHeight,
              // backgroundColor: 'rgb(14,14,18)',
              width: DEVICE_WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#111" />
          </View>
        )}
        {/* <View style={style.footerStyle}>
          <Button text="Confirm" />
        </View> */}
      </View>
    );
  }
}

PrivacyPolicy.propTypes = {
  navigation: PropTypes.object,
};
