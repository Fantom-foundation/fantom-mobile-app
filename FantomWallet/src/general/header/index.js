import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    render() {
        let { text, rightButtonIcon, isShowRightButtonIcon, leftButtonIcon, isShowLeftButtonIcon, headerStyle, textStyle, rightButtonStyle, leftButtonStyle, rightIconSize, rightIconColor, leftIconSize, leftIconColor, activeOpacity } = this.props;

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
                <View style={style.mainViewStyle}>
                    <Text style={textStyle}>{text}</Text>
                    {((!isShowRightButtonIcon) && rightIcon !== '') &&
                        <TouchableOpacity style={rightButtonStyle} activeOpacity={activeOpacity} onPress={this.onRightIconPress.bind(this)}>
                            <Icon name={`${rightIcon}`} size={rightIconSize} color={`${rightIconColor}`} />
                        </TouchableOpacity>}

                    {((!isShowLeftButtonIcon) && leftIcon !== '') &&
                        <TouchableOpacity style={leftButtonStyle} activeOpacity={activeOpacity} onPress={this.onLeftIconPress.bind(this)}>
                            <Icon name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} />
                        </TouchableOpacity>}
                </View>
            </View>
        )
    }

}

Header.defaultProps = {
    text: '',
    headerStyle: style.headerStyle,
    textStyle: {},
    buttonStyle: {},
    activeOpacity: 0.2,
}

export default Header;