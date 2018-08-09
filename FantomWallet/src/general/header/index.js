import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

        const rightIcon = rightButtonIcon || '';
        const rightButtonIconStyleProps = rightButtonStyle || {};
        rightButtonStyle = {
            ...style.rightButtonStyle,
            ...rightButtonIconStyleProps
        }

        const leftIcon = leftButtonIcon || '';
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
                {((!isShowRightButtonIcon) && rightIcon !== '') && <Icon style={rightButtonStyle} name={`${rightIcon}`} width="50" />}
                {((!isShowLeftButtonIcon) && leftIcon !== '') && <Icon style={leftButtonStyle} name={`${leftIcon}`} width="40" />}
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