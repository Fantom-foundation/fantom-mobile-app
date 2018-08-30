import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

import Header from '../../general/header/';
import Button from '../../general/button/';

import style from './style';

import crossButton from '../../images/crossButtonWhite.png';

export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.onRightIconPress = this.onRightIconPress.bind(this);
        this.onLeftIconPress = this.onLeftIconPress.bind(this);
    }
    onRightIconPress() {
        console.log('onRightIconPressonRightIconPress');
        this.props.navigation.goBack()
    }
    onLeftIconPress() {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={style.mainContainerStyle}>
                <StatusBar
                    barStyle="light-content" />
                <Header text={'Privacy Policy'} rightButtonIcon={crossButton} onRightIconPress={this.onRightIconPress} />
                <WebView source={{ uri: 'http://www.innow8apps.com' }} />
                <View style={style.footerStyle}>
                    <Button text={'Confirm'} />
                </View>
            </View>
        )
    }
}
