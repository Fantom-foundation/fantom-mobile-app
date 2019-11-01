// @flow
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
  ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './styles';

type Props = {
  text: string,
  headerStyle: ViewStyleProp,
  textStyle: TextStyleProp,
  activeOpacity: 0 | 1,
  fantomIcon: string,
  isShowSecondaryButtonIcon: string,
  onSecondaryIconPress: () => void,
  secondaryButtonIcon: string,
  isShowLeftButtonIcon: string,
  onLeftIconPress: () => {},
  leftButtonStyle: ViewStyleProp,
  leftButtonIcon: string,
  leftIconSize: number,
  leftIconColor: string,
  onRightIconPress: () => void,
  isShowRightButtonIcon: string,
  isRightBtnImage: string,
  rightButtonIcon: string,
  rightButtonStyle: ViewStyleProp,
  rightIconSize: string,
  rightIconColor: string,
  rightImageStyling: ImageStyleProp,
};
/**
 * Header : This component is meant for rendering Header Bar on any screen.
 */
const Header = ({
  text,
  leftButtonIcon,
  leftIconSize,
  leftIconColor = '',
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
  rightIconColor = '',
  rightImageStyling,
}: Props) => (
  <View style={[style.headerStyle, headerStyle]}>
    <View style={style.mainViewStyle}>
      <View style={style.headerIconTextStyle}>
        {fantomIcon && (
          <Image source={fantomIcon} style={style.fantomIconStyle} resizeMode="contain" />
        )}
        {text && <Text style={[style.textStyle, textStyle]}>{text}</Text>}
      </View>

      {!isShowSecondaryButtonIcon && secondaryButtonIcon && (
        <TouchableOpacity style={style.secondaryButtonStyle} onPress={onSecondaryIconPress}>
          <Image
            source={secondaryButtonIcon}
            style={style.secondaryImageStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {!isShowRightButtonIcon && rightButtonIcon && (
        <TouchableOpacity
          style={[style.rightButtonStyle, rightButtonStyle]}
          activeOpacity={activeOpacity}
          onPress={onRightIconPress}
        >
          {isRightBtnImage ? (
            <Image
              source={rightButtonIcon}
              style={[style.rightImageStyle, rightImageStyling]}
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
      {/* <Image source={rightIcon} style={style.rightImageStyle} resizeMode="contain" />
              </TouchableOpacity>
            )} */}

      {!isShowLeftButtonIcon && leftButtonIcon !== '' && (
        <TouchableOpacity
          style={[style.leftButtonStyle, leftButtonStyle]}
          activeOpacity={activeOpacity}
          onPress={onLeftIconPress}
        >
          <Icon name={leftButtonIcon} size={leftIconSize} color={leftIconColor} />
          {/* <Icon name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} /> */}
          {/* <Image source={leftIcon} style={style.leftImageStyle} resizeMode="contain" /> */}
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default Header;
