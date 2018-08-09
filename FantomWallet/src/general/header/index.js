import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Header extends Component {

    render() {
        let { text, rightButtonIcon, isShowRightButtonIcon, leftButtonIcon, isShowLeftButtonIcon, headerStyle, textStyle, rightButtonStyle, leftButtonStyle, rightIconSize, rightIconColor, leftIconSize, leftIconColor } = this.props;

        const headerStyleProps = headerStyle || {};
        headerStyle = {
            ...style.headerStyle,
            ...headerStyleProps
        }

        const textStyleProps = textStyle || {};
        textStyle = {
            ...style.textStyle,
            ...textStyleProps
        }

        const rightIcon = rightButtonIcon || '';
        rightIconSize = rightIconSize || 20;
        rightIconColor = rightIconColor || '#fff';
        const rightButtonIconStyleProps = rightButtonStyle || {};
        rightButtonStyle = {
            ...style.rightButtonStyle,
            ...rightButtonIconStyleProps
        }

        const leftIcon = leftButtonIcon || '';
        leftIconSize = leftIconSize || 20;
        leftIconColor = leftIconColor || '#fff';
        const leftButtonIconStyleProps = leftButtonStyle || {};
        leftButtonStyle = {
            ...style.leftButtonStyle,
            ...leftButtonIconStyleProps
        }

        return (
            <View style={headerStyle} >
                <Text style={textStyle}>{text}</Text>
                {((!isShowRightButtonIcon) && rightIcon !== '') && <Icon style={rightButtonStyle} name={`${rightIcon}`} size={rightIconSize} color={`${rightIconColor}`} />}
                {((!isShowLeftButtonIcon) && leftIcon !== '') && <Icon style={leftButtonStyle} name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} />}
            </View>
        )
    }

}

Header.defaultProps = {
    text: '',
    headerStyle: style.headerStyle,
    textStyle: {},
    buttonStyle: {},
}

export default Header;