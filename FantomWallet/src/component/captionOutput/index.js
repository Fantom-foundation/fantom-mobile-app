import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';

class CaptionOutput extends Component {
    state = {

    }
    render() {
        return (
            <View>
                <Header text='Caption Output' />
            </View>
        );
    }
}

export default CaptionOutput;