import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import style from './style';
export default class inputBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View>
                <Text style={style.phraseNumber}> { this.props.phraseNumber }th Phrase</Text> 
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    style={style.textBox}
                />
                { this.props.error ? <Text> {this.props.errorMessage}</Text> : null }
            </View>
        );
    }
}