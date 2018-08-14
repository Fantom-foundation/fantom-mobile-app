import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
// import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import ProgressBar from '../../general/progressBar/index';

class CaptionOutput extends Component {
    state = {
        characters: ['course', 'invest', 'nuclear', 'odor', 'dance', 'cousin', 'purity', 'quarter', 'record', 'stove', 'park', 'photo']
    }
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={style.mainContainerStyle}>
            <StatusBar barStyle="light-content" />
                <Header text='Caption Output' leftButtonIcon='arrow-back' onLeftIconPress={this.onLeftIconPress} />
                <View style={style.mid}>
                <ProgressBar completed='2' remaining='3'/>
                    <View style={style.generateView}>
                        <Text style={style.generateText}>Generate 12 characters for wallet creation. Be sure to keep the following words.</Text>
                    </View>
                    <View style={style.text}>
                        {this.state.characters.map((val, i) => {
                            return (<Text style={style.mapText} >{i + 1}.{val}</Text>);
                        })}
                    </View>
                </View>
                <View style={style.footerStyle}>
                    <Button style={style.footerText} text='Next' onPress={() => { this.props.navigation.navigate('CaptchaVerification') }} />
                </View>
            </View>
        );
    }
}

export default CaptionOutput;