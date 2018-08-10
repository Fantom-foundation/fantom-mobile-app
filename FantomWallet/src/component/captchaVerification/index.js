import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import InputBox from '../../general/inputBox/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';

class CaptchaVerification extends Component {

    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
   
    render() {
        return (
            <View style={style.mainContainerStyle}>
            <StatusBar barStyle="light-content" />
                <Header text='Captcha Verification' leftButtonIcon='arrow-back' onLeftIconPress={this.onLeftIconPress} />
                <View style={style.mid}>
                    <ProgressBar completed='3' remaining='2' />
                    <View style={style.generateText}>
                        <Text>Please enter the corresponding phrase out of the 12 back up phrases.</Text>
                    </View>

                    <View style={style.textBox}><InputBox phraseNumber='5' error = {true}/></View>
                    <View style={style.textBox}><InputBox phraseNumber='9' error={false} /></View>
                    <View style={style.textBox}><InputBox phraseNumber='12' error={true}/></View>
                </View>
                <View style={style.footerStyle}>
                    <Button text='Confirm' buttonStyle={{ backgroundColor: '#d9d8d9' }} textStyle={{ color: '#a5a5a5' }} />
                </View>
            </View>
        );
    }
}

export default CaptchaVerification;
