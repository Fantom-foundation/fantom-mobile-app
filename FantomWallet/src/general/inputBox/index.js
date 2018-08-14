import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import style from './style';
export default class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '',characters: ['course', 'invest', 'nuclear', 'odor', 'dance', 'cousin', 'purity', 'quarter', 'record', 'stove', 'park', 'photo']};
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
                { !!this.state.text && this.state.characters[this.props.phraseNumber - 1] !== this.state.text ? <Text style={style.error}> Please re-enter the correct characters</Text> :null}
            </View>
        );
    }
}