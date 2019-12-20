/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import type {
  ViewStyleProp,
  TextStyleProp,
  ImageStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

/**
 * Header : This component is meant for rendering Header Bar on any screen.
 */
const Header = (props: THeaderTypes) => {
  const {
    text,
    leftButtonIcon,
    leftIconSize,
    leftIconColor = "",
    isShowLeftButtonIcon,
    headerStyle,
    textStyle,
    activeOpacity,
    leftButtonStyle,
    secondaryButtonIcon,
    isShowSecondaryButtonIcon,
    fantomIcon,
    isRightBtnImage,
    onLeftIconPress,
    onSecondaryIconPress,
    onRightIconPress,
    rightButtonIcon,
    rightButtonStyle = {},
    isShowRightButtonIcon,
    rightIconSize,
    rightIconColor = "",
    rightImageStyling
  } = props;
  return (
    <View style={[styles.headerStyle, headerStyle]}>
      <View style={styles.mainViewStyle}>
        <View style={styles.headerIconTextStyle}>
          {fantomIcon && (
            <Image
              source={fantomIcon}
              style={styles.fantomIconStyle}
              resizeMode="contain"
            />
          )}
          {text && <Text style={[styles.textStyle, textStyle]}>{text}</Text>}
        </View>

        {!isShowSecondaryButtonIcon && secondaryButtonIcon && (
          <TouchableOpacity
            style={styles.secondaryButtonStyle}
            onPress={onSecondaryIconPress}
          >
            <Image
              source={secondaryButtonIcon}
              style={styles.secondaryImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {!isShowRightButtonIcon && rightButtonIcon && (
          <TouchableOpacity
            style={[styles.rightButtonStyle, rightButtonStyle]}
            activeOpacity={activeOpacity}
            onPress={() => onRightIconPress()}
          >
            {isRightBtnImage ? (
              <Image
                source={rightButtonIcon}
                style={[styles.rightImageStyle, rightImageStyling]}
                resizeMode="contain"
              />
            ) : (
              <Icon
                {...(rightButtonIcon ? { name: `${rightButtonIcon}` } : {})}
                {...(rightIconColor ? { color: `${rightIconColor}` } : {})}
                size={rightIconSize}
              />
            )}
          </TouchableOpacity>
        )}

        {/* {!isShowRightButtonIcon &&
            rightIcon !== '' && (
              <TouchableOpacity
                style={rightButtonStyle}
                activeOpacity={activeOpacity}
                onPress={() => this.onRightIconPress()}
              > */}
        {/* <Icon name={`${rightIcon}`} size={rightIconSize} color={`${rightIconColor}`} /> */}
        {/* <Image source={rightIcon} style={styles.rightImageStyle} resizeMode="contain" />
              </TouchableOpacity>
            )} */}

        {!isShowLeftButtonIcon && leftButtonIcon !== "" && (
          <TouchableOpacity
            style={[styles.leftButtonStyle, leftButtonStyle]}
            activeOpacity={activeOpacity}
            onPress={onLeftIconPress}
          >
            <Icon
              name={leftButtonIcon}
              size={leftIconSize}
              color={leftIconColor}
            />
            {/* <Icon name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} /> */}
            {/* <Image source={leftIcon} style={styles.leftImageStyle} resizeMode="contain" /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Header;
