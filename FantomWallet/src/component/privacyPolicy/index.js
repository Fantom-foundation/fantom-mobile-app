import React, {Component} from 'react';
import {View } from 'react-native';

import Header from '../../general/header/index';
import Footer from '../../general/footer/index';


export default class PrivacyPolicy extends Component {
    render() {
        return(
            <View> 
                <Header headerText={'Privacy Policy'} />
                <Text > Terms and Conditions required</Text>
                <Footer footerText={'Confirm'} />
            </View>
        )
    }
}