import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { LinkButton } from 'general/';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import ProgressBar from '../../general/progressBar/index';
import { StatusBar } from 'react-native';
import Address from './address/index';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import arrowLeftButton from '../../images/arrowLeft_White.png';
import editRightButton from '../../images/pluswhite.png';
import whiteSearchIcon from '../../images/searchWhite.png';
import searchIcon from '../../images/search.png'
import { Dimensions } from 'react-native';
import * as AddressAction from '../../redux/addressBook/action';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class AddressBook extends Component {
    state = {
        addOrFavorite: 'add',
        addressList: [{ id: 1, name: 'John Doe', line1Text: '1GWQCH37uJEvDzQkd', rate: false },
        { id: 2, name: 'John Doe', line1Text: '2GWQCH37uJEvDzQkd', rate: false },
        { id: 3, name: 'John Doe', line1Text: '3GWQCH37uJEvDzQkd', rate: false },
        { id: 4, name: 'John Doe', line1Text: '4GWQCH37uJEvDzQkd', rate: false },
        { id: 5, name: 'John Doe', line1Text: '5GWQCH37uJEvDzQkd', rate: false },
        { id: 6, name: 'John Doe', line1Text: '1GWQCH37uJEvDzQkd', rate: false },
        { id: 7, name: 'John Doe', line1Text: '2GWQCH37uJEvDzQkd', rate: false },
        { id: 8, name: 'John Doe', line1Text: '3GWQCH37uJEvDzQkd', rate: false },
        { id: 9, name: 'John Doe', line1Text: '4GWQCH37uJEvDzQkd', rate: false },
        { id: 10, name: 'John Doe', line1Text: '5GWQCH37uJEvDzQkd', rate: false }
        ],
        displaySearch: false,
        searchText: '',
    }
    onLeftIconPress = () => {
        this.props.navigation.goBack()
    }
    onSecondaryIconPress = () => {
        this.setState({
            displaySearch: !this.state.displaySearch,
            searchText: '',
        })
    }
    onRightIconPress() {
        this.props.navigation.navigate('EditContact')
    }

    deleteItem = (address) => {
      Alert.alert('Confirm Dialog', 'Are you sure you want to delete this contact.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {this.props.deleteAddress(address);}},
      ]);
      
    }

    rateChange = (address) => {
      this.props.toggleAddress(address);
    }

    onSelection(address) {
      const callbackFunc = this.props.navigation.getParam('onSelection', null);
      if (callbackFunc) {
        callbackFunc(address);
        this.props.navigation.goBack();
      }
    }

    renderAddressList() {
      const isEditMode = this.props.navigation.getParam('isEditMode', false);

      let addressListView = [];
      let favoriteListView = [];
      const addresses = this.props.addresses;
        if (addresses) {
          for (const key in addresses) {
            if (addresses.hasOwnProperty(key)) {
               const tempAddress = addresses[key];
               if (this.state.displaySearch && this.state.searchText !== '') {
                 const searchText = this.state.searchText.toLowerCase();
                 const name = tempAddress.name.toLowerCase();
                 const addressLower = tempAddress.address.toLowerCase();
                 if (!(name.includes(searchText) || addressLower.includes(searchText))) {
                  continue;
                 }
               }
               addressListView.push(
                <Address key={key} id={tempAddress.address} isEditMode={isEditMode} onSelection={this.onSelection.bind(this)} index={key} name={tempAddress.name} line1Text={tempAddress.address} rate={tempAddress.isFavourite} rateChange={this.rateChange} delete={this.deleteItem} />
               );
               if (tempAddress.isFavourite) {
                favoriteListView.push(
                  <Address key={key} id={tempAddress.address} isEditMode={isEditMode} onSelection={this.onSelection.bind(this)} index={key} name={tempAddress.name} line1Text={tempAddress.address} rate={tempAddress.isFavourite} rateChange={this.rateChange} delete={this.deleteItem} />
                 );
               }
            }
         }
        }
        if (this.state.addOrFavorite === 'favorite') {
          return favoriteListView;
        }
        return addressListView;
    }

    render() {
        console.log(this.props.addresses);
        let addColor = style.add;
        let favColor = style.favorites;
        let addColorText = { color: 'black' };
        let favColorText = { color: 'black' };


        if (this.state.addOrFavorite === 'add') {
            addColor = { ...style.add, backgroundColor: 'rgb(63,62,63)' };
            addColorText = { color: 'rgb(232,232,232)' };
            favColor = style.favorites;
        } else if (this.state.addOrFavorite === 'favorite') {
            favColor = { ...style.favorites, backgroundColor: 'rgb(63,62,63)' };
            favColorText = { color: 'rgb(232,232,232)' }
            addColor = style.add;
        }
        

        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Address Book'
                    leftButtonIcon={arrowLeftButton}
                    rightButtonIcon={editRightButton}
                    onLeftIconPress={this.onLeftIconPress}
                    onRightIconPress={() => this.onRightIconPress()}
                    rightIconSize={30} 
                    headerStyle={{ backgroundColor: 'rgb(233,177,18)' }} 
                    rightButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }}
                    leftButtonStyle={{ flex: 1, }}
                    secondaryButtonIcon={whiteSearchIcon}
                    onSecondaryIconPress={this.onSecondaryIconPress} />

                <View style={style.addressList} >
                    {!this.state.displaySearch ?
                        (<View style={style.subHeader}>
                            <TouchableOpacity style={addColor} onPress={() => this.setState({ addOrFavorite: 'add' })}>
                                <Text style={addColorText}>Recent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={favColor} onPress={() => this.setState({ addOrFavorite: 'favorite' })}>
                                <Text style={favColorText}>Favorites</Text>
                            </TouchableOpacity>
                        </View>) : null}
                    <View style={ style.displaySearch} >
                        {this.state.displaySearch ?
                            (<View style={style.textInputContainer}>
                                <TextInput placeholder='Search' style={{ flex: 3,fontFamily:'SFProDisplay-SemiBold' }}
                                  onChangeText={(text) => this.setState({ searchText: text })}
                                  autoCapitalize='none'
                                ></TextInput>
                                <Image source={searchIcon} style={ style.imageSize} />
                            </View>) : null}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ height: deviceHeight }}
                        >{this.renderAddressList()}<View style={{ height: 50 }} />
                        </ScrollView>
                    </View>
                    
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    addresses: state.addressBookReducer.addresses,
  };
},
  mapDispatchToProps = (dispatch) => {
    return {
      addNewAddress: (walletAddress, name) => {
        dispatch({ type: AddressAction.ADD_ADDRESS, address: walletAddress, name: name || '' })
      },
      toggleAddress: (walletAddress) => {
        dispatch({ type: AddressAction.FAVOURITE_ADDRESS, address: walletAddress })
      },
      deleteAddress: (walletAddress) => {
        dispatch({ type: AddressAction.DELETE_ADDRESS, address: walletAddress })
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
