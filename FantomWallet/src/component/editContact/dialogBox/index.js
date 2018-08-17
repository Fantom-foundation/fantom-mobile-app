import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class DialogBox extends Component {
    render() {
        return (
            <View style={{position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'rgba(242,242,242,0.9)',background:'transparent'}}>
                <View style={{position:'absolute',top:deviceHeight*0.38,left:deviceWidth*0.11,backgroundColor:'white',borderColor:'#f2f2f2',borderWidth:1}}>
                    <View style={{alignItems:'center',backgroundColor:'white',paddingTop:48,paddingBottom:48,paddingLeft:24,paddingRight:24}}>
                        <Text>This address already exists.</Text> 
                        <Text>Please re- enter your wallet address.</Text>
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'black',height:44}}>
                    <TouchableOpacity onPress={this.props.onConfirm}><Text style={{color:'white',fontSize:24}}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default DialogBox;