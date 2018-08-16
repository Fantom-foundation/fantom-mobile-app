import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';
import Address from './address/index';
import QRCode from 'react-native-qrcode';

class AddressBook extends Component {
    state = {
        addOrFavorite: 'add',
        addressList: [{ id: 1, name: '[Name]', line1Text: '1GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 2, name: '[Name]', line1Text: '2GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 3, name: '[Name]', line1Text: '3GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 4, name: '[Name]', line1Text: '4GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 5, name: '[Name]', line1Text: '5GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 6, name: '[Name]', line1Text: '1GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 7, name: '[Name]', line1Text: '2GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 8, name: '[Name]', line1Text: '3GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 9, name: '[Name]', line1Text: '4GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false },
        { id: 10, name: '[Name]', line1Text: '5GWQCH37uJEvDzQkd', line2Text: '3u5PTslUTmcxPj2W7', rate: false }
        ]
    }
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    deleteItem = (id) => {
        const index = this.state.addressList.findIndex((el) => el.id === id);
        let newAddressLst = this.state.addressList.slice();
        newAddressLst.splice(index, 1);
        this.setState({ addressList: newAddressLst });
    }
    rateChange = (id) => {
        const index = this.state.addressList.findIndex((el) => el.id === id);
        let newAddressLst = this.state.addressList.slice();
        newAddressLst[index].rate = !newAddressLst[index].rate;
        this.setState({ addressList: newAddressLst });
    }
    
    render() {
        let addColor = style.add;
        let favColor = style.favorites;
        let addColorText = { color: 'black' };
        let favColorText = { color: 'black' };
        let addressListView = null;
        let favListView = null;
        if (this.state.addOrFavorite === 'add') {
            addColor = { ...style.add, backgroundColor: 'rgb(63,62,63)' };
            addColorText = { color: 'white' };
            favColor = style.favorites;
        } else if (this.state.addOrFavorite === 'favorite') {
            favColor = { ...style.favorites, backgroundColor: 'rgb(63,62,63)' };
            favColorText = { color: 'white' }
            addColor = style.add;
        }
        if (this.state.addressList.length) {
            addressListView = this.state.addressList.map((val, index) => <Address key={index} id={val.id} index={index} name={val.name} line1Text={val.line1Text} line2Text={val.line2Text} rate={val.rate} rateChange={this.rateChange} delete={this.deleteItem} />)
        }
        if (this.state.addressList.length) {
            favoriteListView = this.state.addressList.filter((val) => val.rate === true).map((val, index) => <Address key={index} id={val.id} name={val.name} line1Text={val.line1Text} line2Text={val.line2Text} rate={val.rate} rateChange={this.rateChange} delete={this.deleteItem} />)
        }

        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Address Book' leftButtonIcon='arrow-back' rightButtonIcon='add' onLeftIconPress={this.onLeftIconPress} leftIconSize={30} rightIconSize={30} headerStyle={{backgroundColor:'rgb(233,177,18)'}} rightButtonStyle={{backgroundColor:'rgb(233,177,18)'}} leftButtonStyle={{backgroundColor:'rgb(233,177,18)'}}/>
                <View style={{ flex: 1,}} >
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={addColor} onPress={() => this.setState({ addOrFavorite: 'add' })}>
                            <Text style={addColorText}>Recent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={favColor} onPress={() => this.setState({ addOrFavorite: 'favorite' })}>
                            <Text style={favColorText}>Favorites</Text>
                        </TouchableOpacity>
                        {/* {this.state.addOrFavorite === 'fa'} */}
                    </View>
                    {this.state.addOrFavorite === 'add' ? <ScrollView>{addressListView}</ScrollView> : null}
                    {this.state.addOrFavorite === 'favorite' ? <ScrollView>{favoriteListView}</ScrollView> : null}
                    
                </View>
            </View>
        );
    }
}

export default AddressBook;