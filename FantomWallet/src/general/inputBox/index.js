import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class inputBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View>
                <Text> { this.props.phraseNumber }Phrase</Text> 
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                { this.props.error ? <Text> {this.props.errorMessage}</Text> : null }
            </View>
        );
    }
}