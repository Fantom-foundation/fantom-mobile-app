import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';

class CaptionOutput extends Component {
    state = {

    }
    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content" />
                <Header text='Caption Output' />
            </View>
        );
    }
}

export default CaptionOutput;