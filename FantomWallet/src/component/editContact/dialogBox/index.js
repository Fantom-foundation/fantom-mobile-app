import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
//top:deviceHeight*0.38,left:deviceWidth*0.11
class DialogBox extends Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.subContainer}>
                    <View style={style.addressTextContainer}>
                        <Text>This address already exists.</Text> 
                        <Text>Please re- enter your wallet address.</Text>
                    </View>
                    <View style={style.confirmContainer}>
                    <TouchableOpacity onPress={this.props.onConfirm}><Text style={style.confirmText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default DialogBox;