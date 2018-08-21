import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import style from './style';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const WHITE_COLOR = '#fff';

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
    onSecondaryIconPress(){
        if (this.props.onSecondaryIconPress) {
            this.props.onSecondaryIconPress();
        }
    }
    render() {
        let { text, rightButtonIcon, isShowRightButtonIcon, leftButtonIcon, isShowLeftButtonIcon, headerStyle, textStyle, rightButtonStyle,
            leftButtonStyle, rightIconSize, rightIconColor, leftIconSize, leftIconColor, activeOpacity,
            secondaryButtonIcon, isShowSecondaryButtonIcon, secondaryButtonStyle, secondaryIconSize, secondaryIconColor,
            fantomIcon } = this.props;

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
        // rightIconSize = rightIconSize || 20;
        // rightIconColor = rightIconColor || WHITE_COLOR;
        const rightButtonIconStyleProps = rightButtonStyle || {};
        rightButtonStyle = {
            ...style.rightButtonStyle,
            ...rightButtonIconStyleProps
        }

        const leftIcon = leftButtonIcon || '';
        // leftIconSize = leftIconSize || 20;
        // leftIconColor = leftIconColor || WHITE_COLOR;
        const leftButtonIconStyleProps = leftButtonStyle || {};
        leftButtonStyle = {
            ...style.leftButtonStyle,
            ...leftButtonIconStyleProps
        }


        const secondaryIcon = secondaryButtonIcon || '';
        // secondaryIconSize = secondaryIconSize || 20;
        // secondaryIconColor = secondaryIconColor || WHITE_COLOR;
        const secondaryButtonIconStyleProps = secondaryButtonStyle || {};
        secondaryButtonStyle = {
            ...style.secondaryButtonStyle,
            ...secondaryButtonIconStyleProps
        }

        return (
            <View style={headerStyle} >
                <View style={style.mainViewStyle}>
                    <View style={style.headerIconTextStyle}>
                        {fantomIcon && <Image source={fantomIcon} style={style.fantomIconStyle}    resizeMode={'contain'} />}
                        <Text style={textStyle}>{text}</Text>
                    </View>

                    {((!isShowSecondaryButtonIcon) && secondaryIcon !== '') &&
                        <TouchableOpacity style={style.secondaryButtonStyle} onPress={this.onSecondaryIconPress.bind(this)}>
                            <Image source={secondaryIcon} style={style.secondaryImageStyle}
                               resizeMode={'contain'}
                            />
                        </TouchableOpacity>}

                    {((!isShowRightButtonIcon) && rightIcon !== '') &&
                        <TouchableOpacity style={rightButtonStyle} activeOpacity={activeOpacity} onPress={this.onRightIconPress.bind(this)}>
                            {/* <Icon name={`${rightIcon}`} size={rightIconSize} color={`${rightIconColor}`} /> */}
                            <Image source={rightIcon} style={style.rightImageStyle} 
                               resizeMode={'contain'}
                            />
                        </TouchableOpacity>}

                    {((!isShowLeftButtonIcon) && leftIcon !== '') &&
                        <TouchableOpacity style={leftButtonStyle} activeOpacity={activeOpacity} onPress={this.onLeftIconPress.bind(this)}>
                            {/* <Icon name={`${leftIcon}`} size={leftIconSize} color={`${leftIconColor}`} /> */}
                            <Image source={leftIcon} style={style.leftImageStyle}
                            resizeMode={'contain'}
                            />
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