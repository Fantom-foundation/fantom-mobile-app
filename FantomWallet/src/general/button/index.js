import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import style from './style';
import PropTypes from 'prop-types';
/**
 * Button : This is generic component , meant for rendering Button on any screen.
 */
class Button extends Component {

    onPress() {
        if (this.props.onPress) {   
            this.props.onPress();
        }
    }

    render() {
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

/**
 * Custom setting props to be passed for Button display changes: 
 * 
 * text: To Set Text to be displayed on Button.
 * buttonStyle: Custom settings of style for button.
 * textStyle: Custom settings of style for text to be displayed on Button.
 * activeOpacity: Custom settings for touch opacity of button press.
 * onPress: Callback function to perform action on button press. 
 * 
 */

Button.propTypes = {
    text: PropTypes.string,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    activeOpacity: PropTypes.number,
}

Button.defaultProps = {
    text: '',
    buttonStyle: style.buttonStyle,
    textStyle: {},
    activeOpacity: 0.2
}

export default Button;
