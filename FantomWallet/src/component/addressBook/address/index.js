import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import IconDelete from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';


class Address extends Component {

    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    render() {
        let starIcon = 'star-border';
        if (this.props.rate) {
            starIcon = 'star'
        }
        return (
            <View style={{ flexDirection: 'row', marginTop: 10, borderWidth: 2, borderColor: 'rgb(213,213,213)', padding: 5, borderRadius: 3 }}>
                <View style={style.mark}>
                    <Text style={style.markText}>Mark</Text>
                </View>
                <View style={style.mid}>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.line1Text}</Text>
                    <Text>{this.props.line2Text}</Text>
                </View>
                <View style={style.icons}>
                    <TouchableOpacity onPress={() => this.props.rateChange(this.props.id)}><Icon name={starIcon} size={25} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.delete(this.props.id)}><IconDelete name='trash' size={25} /></TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default Address;