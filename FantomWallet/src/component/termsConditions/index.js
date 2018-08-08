import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../../general/header/';
import Button from '../../general/button/';

import style from './style';

export default class TermsConditions extends Component {
    render() {
        return (
            <View style={style.mainContainerStyle}>
                <Header title={'Terms of Service'} />
                <Text> Terms and Conditions here</Text>
                <View style={style.footerStyle} >
                    <Button label={'Confirm'} />
                </View>
            </View>
        )
    }
}