import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import InputBox from '../../general/inputBox/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class CaptchaVerification extends Component {

    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
   
    render() {
        return (
            <View style={style.mainContainerStyle}>
            <StatusBar barStyle="light-content" />
                {/* <Header text='Captcha Verification' leftButtonIcon='arrow-back' onLeftIconPress={this.onLeftIconPress} /> */}
                
                <View style={style.mid}>
                
                    <ProgressBar completed='3' remaining='2' />
                    <View style={style.backArrow}>
                    <Icon name='arrow-back' size={20}/>
                    </View>
                    
                    <View style={style.header}>
                        <Text style={style.headerText}>Captcha Verification</Text>
                    </View>
                    <View style={style.subHeader}>
                        <Text style={style.subHeaderText1}>Please enter the corresponding</Text> 
                        <Text style={style.subHeaderText2}>phrase out of the 12 back up phrases.</Text>
                    </View>

                    <View style={style.textBox}><InputBox phraseNumber='5' error = {true}/></View>
                    <View style={style.textBox}><InputBox phraseNumber='9' error={false} /></View>
                    <View style={style.textBox}><InputBox phraseNumber='12' error={true}/></View>
                </View>
                <View style={style.footerStyle}>
                    <Button text='Verify' buttonStyle={{ backgroundColor: 'black' }} textStyle={{ color: 'white' }} />
                </View>
            </View>
        );
    }
}

export default CaptchaVerification;
