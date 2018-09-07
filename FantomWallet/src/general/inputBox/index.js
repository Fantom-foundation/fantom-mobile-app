import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

/**
 * InputBox: A component for rendering input box in Captcha Verification Screen.
 */
export default class InputBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={style.phraseNumber}> {this.props.phraseNumber}</Text>
                <TextInput
                    onChangeText={(text) => this.props.onChangeText(text)}
                    value={this.props.text}
                    style={style.textBox}
                    autoCapitalize='none'
                // onFocus={() => this.props.onFocus()}
                // onBlur={() => this.props.onBlur()}
                />

            </View>
        );
    }
}

/**
 * Custom setting props to be passed for InputBox display changes: 
 * 
 * phraseNumber: Contains phrase number to be displayed on input box.
 * text: To Set Text to be displayed in input box.
 * onChangeText: Callback function to handle onChange on inputbox. 
 * 
 */

InputBox.propTypes = {
    phraseNumber: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    text: PropTypes.string,
    onChangeText: PropTypes.func,
}
