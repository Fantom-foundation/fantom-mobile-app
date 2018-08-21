import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Header from '../../../../general/header/index';

import leftArrowIcon from '../../../../images/arrowLeft_White.png';
import style from './style';

class AboutApp extends Component {
    onLeftIconPress = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                <View>
                <Header text='About App' leftButtonIcon={leftArrowIcon} onLeftIconPress={this.onLeftIconPress} />
                </View>
                <View style={{ padding: 20 }}>
                    <View><Text style={{fontWeight:'bold'}}>Android</Text><Text style={{fontWeight:'bold'}}>ver1.0</Text></View>
                    <View style={{marginTop:20}}><Text>Data information: 2018120102022</Text><Text>Version information 1.0 (latest version)</Text></View>
                    <View><Text style={{fontWeight:'bold',marginTop:20}}>iOS ver1.0</Text></View>
                    <View style={{marginTop:20}}><Text>Data information: 2018120102022</Text><Text>Version information 1.0 (latest version)</Text></View>
                </View>
            </View>
        )
    }
}

export default AboutApp;