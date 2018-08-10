import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './style';


class Address extends Component {

    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10,borderWidth:2,borderColor:'rgb(213,213,213)',padding:5,borderRadius:3 }}>
                <View style={style.mark}>
                    <Text>mark</Text>
                </View>
                <View style={style.mid}>
                    <Text>name</Text>
                    <Text>1JEGDFJKCDGSFCKV</Text>
                    <Text>name</Text>
                </View>
                <View style={style.icons}>
                    <Icon name='star' size={25} />
                    <Icon name='trash' size={25} />
                </View>

            </View>
        );
    }
}

export default Address;