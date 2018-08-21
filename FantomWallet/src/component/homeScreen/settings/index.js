import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Header from '../../../general/header/index';

import leftArrowIcon from '../../../images/arrowLeft_White.png';
import style from './style';

class Settings extends Component {
    onLeftIconPress = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                <View>
                <Header text='Settings' leftButtonIcon={leftArrowIcon} onLeftIconPress={this.onLeftIconPress} />
                </View>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressBook')}style={{ borderWidth: 1, borderColor: 'rgb(200,200,200)', padding: 20, backgroundColor: 'rgb(244,244,244)',marginTop:30 }}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>Address Book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerSupport')}style={{ borderWidth: 1, borderColor: 'rgb(200,200,200)', padding: 20, backgroundColor: 'rgb(244,244,244)',marginTop:30 }}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>Customer Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutApp')}style={{ borderWidth: 1, borderColor: 'rgb(200,200,200)', padding: 20, backgroundColor: 'rgb(244,244,244)',marginTop:30 }}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>About App</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Settings;