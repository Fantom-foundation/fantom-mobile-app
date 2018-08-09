import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';

class Header extends Component {

    render() {
        let { text, rightButtonIcon, isShowRightButtonIcon, leftButtonIcon, isShowLeftButtonIcon, headerStyle, textStyle, rightButtonStyle, leftButtonStyle } = this.props;

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

        const rightIcon = rightButtonIcon || {};
        const rightButtonIconStyleProps = rightButtonStyle || {};
        rightButtonStyle = {
            ...style.rightButtonStyle,
            ...rightButtonIconStyleProps
        }

        const leftIcon = leftButtonIcon || {};
        console.log('leftIcon  :', leftIcon);
        console.log('rightIcon  :', rightIcon);
        const leftButtonIconStyleProps = this.props.leftButtonStyle || {};
        leftButtonStyle = {
            ...style.leftButtonStyle,
            ...leftButtonIconStyleProps
        }

        return (
            <View style={headerStyle} >
                <Text style={textStyle}>{text}</Text>
                {((!isShowRightButtonIcon) && rightIcon === 1) && <Image source={rightIcon} style={rightButtonStyle} />}

                {((!isShowLeftButtonIcon) && leftIcon === 1) && <Image source={leftIcon} style={leftButtonStyle} />}
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