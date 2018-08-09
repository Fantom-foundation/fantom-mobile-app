import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../../general/header/';
import Button from '../../general/button/';

import style from './style';
import iconUri from '../../images/crossButton.png';

export default class TermsConditions extends Component {
    render() {
        return (
            <View style={style.mainContainerStyle}>
                <Header text={'Terms of Service'} rightButtonIcon='close'  />
                <Text> Terms and Conditions here</Text>
                <View style={style.footerStyle} >
                    <Button text={'Confirm'} />
                </View>
            </View>
        )
    }
}