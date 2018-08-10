import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';
import Address from './address/index';

class AddressBook extends Component {
    state = {
        addOrFavorite: 'add'
    }
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    render() {
        let addColor = style.add;
        let favColor = style.favorites;
        if(this.state.addOrFavorite ==='add'){
             addColor = {...style.add,backgroundColor: 'rgb(178,178,178)'};
             favColor = style.favorites;
        } else if(this.state.addOrFavorite ==='favorite') {
             favColor = {...style.favorites,backgroundColor: 'rgb(178,178,178)'};
             addColor = style.add;
        }
        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Address Book' leftButtonIcon='arrow-back' rightButtonIcon='add' onLeftIconPress={this.onLeftIconPress} />
                <View style={{ flex: 1, margin: 10 }} >
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={addColor} onPress={() => this.setState({addOrFavorite:'add'})}><Text>Add</Text></TouchableOpacity>
                        <TouchableOpacity style={favColor} onPress={() => this.setState({addOrFavorite:'favorite'})}><Text>Favorites</Text></TouchableOpacity>
                        {/* {this.state.addOrFavorite === 'fa'} */}
                    </View>
                    <Address />
                </View>
            </View>
        );
    }
}

export default AddressBook;