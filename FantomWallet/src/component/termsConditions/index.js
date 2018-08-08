import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../../general/header/index';
import Footer from '../../general/footer/index';

export default class TermsConditions extends Component {
    render() {
        return (
            <View>
                <Header headerText={'Terms of Service'} />
                <Text> Terms and Conditions here</Text>
                <Footer footerText={'Confirm'} />
            </View>
        )
    }
}