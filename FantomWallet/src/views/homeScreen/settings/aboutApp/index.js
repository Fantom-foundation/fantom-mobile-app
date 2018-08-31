import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Header from '../../../../general/header/index';

import leftArrowIcon from '../../../../images/arrowLeft_White.png';
import style from './style';
import VersionCheck from 'react-native-version-check';

class AboutApp extends Component {
    onLeftIconPress = () => {
        this.props.navigation.goBack()
    }
    state={
        version:'0.0'
    }
    componentDidMount(){
    const version = VersionCheck.getCurrentVersion();     // 0.1.1
        this.setState({
            version:version
        })
    }
    render() {
        return (
            <View style={style.container}>
                <View>
                    <Header text='About App' leftButtonIcon={leftArrowIcon} onLeftIconPress={this.onLeftIconPress} />
                </View>
                <View style={style.body}>
                    <View>
                        <Text style={style.bold}>Android ver{this.state.version}</Text>
                    </View>
                    <View style={style.margin20}>
                        <Text>Data information: 2018120102022</Text><Text>Version information 1.0 (latest version)</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>iOS ver1.0</Text>
                    </View>
                    <View style={style.margin20}>
                        <Text>Data information: 2018120102022</Text>
                        <Text>Version information 1.0 (latest version)</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default AboutApp;