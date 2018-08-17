import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import style from './style';
export default class InputBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={style.phraseNumber}> { this.props.phraseNumber }th Phrase</Text> 
                <TextInput
                    onChangeText={(text) => this.props.onChangeText(text)}
                    value={this.props.text}
                    style={style.textBox}
                />
                { this.props.error ? <Text> {this.props.errorMessage}</Text> : null }
            </View>
        );
    }
}