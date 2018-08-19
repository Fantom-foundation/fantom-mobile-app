import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from './style';

class Button extends Component {

    onPress() {
        debugger;
       
            this.props.onPress();
        }
    

    render() {
        console.log(this.props,'log data')
        const buttonStyleProp = this.props.buttonStyle || {};
        const buttonStyle = {
            ...style.buttonStyle,
            ...buttonStyleProp,
        }

        const textStyleProp = this.props.textStyle || {};

        const textStyle = {
            ...style.textStyle,
            ...textStyleProp,
        }

        const { activeOpacity, text } = this.props;

        return (
            <TouchableOpacity style={buttonStyle} activeOpacity={activeOpacity} onPress={this.onPress.bind(this)}>
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }

}

Button.defaultProps = {
    text: '',
    buttonStyle: style.buttonStyle,
    textStyle: {},
    activeOpacity: 0.2
}

export default Button;
