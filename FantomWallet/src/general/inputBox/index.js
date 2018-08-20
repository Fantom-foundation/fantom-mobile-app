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
                <Text style={style.phraseNumber}> { this.props.phraseNumber }</Text> 
                <TextInput
                    onChangeText={(text) => this.props.onChangeText(text)}
                    value={this.props.text}
                    style={style.textBox}
                />
                
            </View>
        );
    }
}