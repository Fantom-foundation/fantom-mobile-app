import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import InputBox from '../../general/inputBox/index';

class CaptchaVerification extends Component {

    render() {
        return (
            <View style={style.mainContainerStyle}>
                <Header text='Caption Output' leftButtonIcon='arrow-left' />
                <View style={style.mid}>
                <View style={style.generateText}>
                        <Text>Please enter the corresponding phrase out of the 12 back up phrases.</Text>
                    </View>
                    <View style={style.textBox}><InputBox phraseNumber='5' /></View>
                    <View style={style.textBox}><InputBox phraseNumber='9' /></View>
                    <View style={style.textBox}><InputBox phraseNumber='12' /></View>
                </View>
                <View style={style.footerStyle}>
                    <Button text='Confirm' buttonStyle={{backgroundColor : '#d9d8d9'}} />
                </View>
            </View>
        );
    }
}

export default CaptchaVerification;