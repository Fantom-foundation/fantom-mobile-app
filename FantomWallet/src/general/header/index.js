import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

// const WHITE_COLOR = '#fff';

/**
 * Header : This component is meant for rendering Header Bar on any screen.
 */
class Header extends Component {
  onRightIconPress() {
    if (this.props.onRightIconPress) {
      this.props.onRightIconPress();
    }
  }

  onLeftIconPress() {
    if (this.props.onLeftIconPress) {
      this.props.onLeftIconPress();
    }
  }

  onSecondaryIconPress() {
    if (this.props.onSecondaryIconPress) {
      this.props.onSecondaryIconPress();
    }
  }

  renderHeaderText() {
    let { text, textStyle } = this.props;

    const textStyleProps = textStyle || {};
    textStyle = {
      ...style.textStyle,
      ...textStyleProps,
    };

    if (text) {
      return (
        <>
          <Text style={textStyle}>{text}</Text>
        </>
      );
    }
    return null;
  }

  render() {
    let {
      rightButtonIcon,
      isShowRightButtonIcon,
      leftButtonIcon,
      isShowLeftButtonIcon,
      headerStyle,
      textStyle,
      rightButtonStyle,
      leftButtonStyle,
      activeOpacity,
      secondaryButtonIcon,
      isShowSecondaryButtonIcon,
      secondaryButtonStyle,
      fantomIcon,
    } = this.props;
    const headerStyleProps = headerStyle || {};
    headerStyle = {
      ...style.headerStyle,
      ...headerStyleProps,
    };

    const textStyleProps = textStyle || {};
    textStyle = {
      ...style.textStyle,
      ...textStyleProps,
    };

    const rightIcon = rightButtonIcon || '';
    const rightButtonIconStyleProps = rightButtonStyle || {};
    rightButtonStyle = {
      ...style.rightButtonStyle,
      ...rightButtonIconStyleProps,
    };

    const leftIcon = leftButtonIcon || '';
    const leftButtonIconStyleProps = leftButtonStyle || {};
    leftButtonStyle = {
      ...style.leftButtonStyle,
      ...leftButtonIconStyleProps,
    };

    const secondaryIcon = secondaryButtonIcon || '';
    const secondaryButtonIconStyleProps = secondaryButtonStyle || {};
    secondaryButtonStyle = {
      ...style.secondaryButtonStyle,
      ...secondaryButtonIconStyleProps,
    };

    return (
      <View style={headerStyle}>
        <View style={style.mainViewStyle}>
          <View style={style.headerIconTextStyle}>
            {fantomIcon && (
              <Image source={fantomIcon} style={style.fantomIconStyle} resizeMode="contain" />
            )}
            {this.renderHeaderText()}
          </View>

          {!isShowSecondaryButtonIcon &&
            secondaryIcon !== '' && (
              <TouchableOpacity
                style={style.secondaryButtonStyle}
                onPress={() => this.onSecondaryIconPress()}
              >
                <Image
                  source={secondaryIcon}
                  style={style.secondaryImageStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}

          {!isShowRightButtonIcon &&
            rightIcon !== '' && (
              <TouchableOpacity
                style={rightButtonStyle}
                activeOpacity={activeOpacity}
                onPress={() => this.onRightIconPress()}
              >
                {/* <Icon name={`${rightIcon}`} size={rightIconSize} color={`${rightIconColor}`} /> */}
                <Image source={rightIcon} style={style.rightImageStyle} resizeMode="contain" />
              </TouchableOpacity>
            )}

          {!isShowLeftButtonIcon &&
            leftIcon !== '' && (
              <TouchableOpacity
                style={leftButtonStyle}
                activeOpacity={activeOpacity}
                onPress={() => this.onLeftIconPress()}
              >
                <Icon
                  name={this.props.leftButtonIcon}
                  size={this.props.leftIconSize}
                  color={this.props.leftIconColor}
                />
                {/* <Icon name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} /> */}
                {/* <Image source={leftIcon} style={style.leftImageStyle} resizeMode="contain" /> */}
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }
}

/**
 * Custom setting props to be passed for Header display changes:
 *
 * text: To Set Text to be displayed on Header bar.
 * rightButtonIcon: To set image icon on right side button.
 * isShowRightButtonIcon:  Boolean value to set right button is required or not on Header,
 *       if isShowRightButtonIcon props is passed it means right button is not displayed.
 * leftButtonIcon: To set image icon on left side button.
 * isShowLeftButtonIcon: Boolean value to set left button is required or not on Header,
 *       if isShowLeftButtonIcon props is passed it means left button is not displayed.
 * headerStyle: Custom settings for Header bar style.
 * textStyle: Custom settings of style for text to be displayed on  Header bar.
 * rightButtonStyle:  Custom settings of style for right button icon on Header bar.
 * leftButtonStyle: Custom settings of style for left button icon on Header bar.
 * activeOpacity: Custom settings for touch opacity of button press.
 * secondaryButtonIcon: To set image icon on secondary button.
 * isShowSecondaryButtonIcon: Boolean value to set secondary button is required or not on Header,
 *       if isShowSecondaryButtonIcon props is passed it means secondary button is not displayed.
 * fantomIcon: To set image icon of FANTOM app.
 *
 */

Header.propTypes = {
  text: PropTypes.string,
  // rightButtonIcon: PropTypes.number,
  isShowRightButtonIcon: PropTypes.bool,
  // leftButtonIcon: PropTypes.number,
  isShowLeftButtonIcon: PropTypes.bool,
  headerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  rightButtonStyle: PropTypes.object,
  leftButtonStyle: PropTypes.object,
  activeOpacity: PropTypes.number,
  // secondaryButtonIcon: PropTypes.number,
  isShowSecondaryButtonIcon: PropTypes.string,
  secondaryButtonStyle: PropTypes.object,
  // fantomIcon: PropTypes.number,
};

Header.defaultProps = {
  text: '',
  headerStyle: style.headerStyle,
  textStyle: {},
  activeOpacity: 0.2,
};

export default Header;
