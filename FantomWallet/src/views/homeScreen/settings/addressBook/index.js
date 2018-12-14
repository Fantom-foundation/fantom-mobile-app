import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from '../../../../general/header';
import style from './style';
import Address from './address/index';

import whiteSearchIcon from '../../../../images/searchWhite.png';
import BackgroundImage from '../../../../images/BackgroundIcon.png';

import * as AddressAction from '../../../../redux/addressBook/action';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

/**
 * AddressBook: This component is meant for handling actions related to Address Book in app.
 */
class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOrFavorite: 'add',
      displaySearch: false,
      searchText: '',
    };

    this.onLeftIconPress = this.onLeftIconPress.bind(this);
    this.onSecondaryIconPress = this.onSecondaryIconPress.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.rateChange = this.rateChange.bind(this);
    this.onSelection = this.onSelection.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  onSecondaryIconPress() {
    const { displaySearch } = this.state;
    this.setState({
      displaySearch: !displaySearch,
      searchText: '',
    });
  }

  onRightIconPress() {
    this.props.navigation.navigate('EditContact');
  }

  onSelection(address) {
    const callbackFunc = this.props.navigation.getParam('onSelection', null);
    if (callbackFunc) {
      callbackFunc(address);
      this.props.navigation.goBack();
    }
  }

  rateChange(address) {
    this.props.toggleAddress(address);
  }

  handleEditContact(name, address) {
    this.props.navigation.navigate('EditContact', { name, address });
  }

  deleteItem(address) {
    Alert.alert('Confirm Dialog', 'Are you sure you want to delete this contact.', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          this.props.deleteAddress(address);
        },
      },
    ]);
  }

  renderAddressList() {
    const isEditMode = this.props.navigation.getParam('isEditMode', false);
    let addressListView = [];
    let favoriteListView = [];
    const addressesStored = this.props.addresses;
    if (addressesStored) {
      const addresses = {};
      let objArr = Object.keys(addressesStored).map(key => addressesStored[key]);
      objArr = objArr.sort((a, b) => {
        if (a.timeStamp && b.timeStamp) {
          return new Date(b.date) - new Date(a.date);
        }
        return 1;
      });
      for (const obj of objArr) {
        addresses[obj.address] = obj;
      }
      for (const key in addresses) {
        if (addresses.hasOwnProperty(key)) {
          const tempAddress = addresses[key];
          if (this.state.displaySearch && this.state.searchText !== '') {
            const searchText = this.state.searchText.toLowerCase();
            const name = tempAddress.name.toLowerCase();
            const addressLower = tempAddress.address.toLowerCase();
            if (!(name.includes(searchText) || addressLower.includes(searchText))) {
              continue; //eslint-disable-line
            }
          }
          addressListView.push(
            <Address
              key={key}
              id={tempAddress.address}
              isEditMode={isEditMode}
              onSelection={this.onSelection}
              index={key}
              name={tempAddress.name}
              line1Text={tempAddress.address}
              rate={tempAddress.isFavourite}
              rateChange={this.rateChange}
              delete={this.deleteItem}
              handleEditContact={this.handleEditContact}
            />
          );
          if (tempAddress.isFavourite) {
            favoriteListView.push(
              <Address
                key={key}
                id={tempAddress.address}
                isEditMode={isEditMode}
                onSelection={this.onSelection}
                index={key}
                name={tempAddress.name}
                line1Text={tempAddress.address}
                rate={tempAddress.isFavourite}
                rateChange={this.rateChange}
                delete={this.deleteItem}
                handleEditContact={this.handleEditContact}
              />
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

  renderMidButtons() {
    let addColor = style.add;
    let favColor = style.favorites;
    let textStyle = { color: '#FFF', fontFamily: 'SFProDisplay-Semibold' };

    if (this.state.addOrFavorite === 'add') {
      addColor = { ...style.add, backgroundColor: 'rgb(0,177,251)' };
      favColor = style.favorites;
    } else if (this.state.addOrFavorite === 'favorite') {
      favColor = { ...style.favorites, backgroundColor: 'rgb(0,177,251)' };
      addColor = style.add;
    }
    if (!this.state.displaySearch) {
      return (
        <View style={style.subHeader}>
          <TouchableOpacity
            style={addColor}
            onPress={() => this.setState({ addOrFavorite: 'add' })}
          >
            <Text style={textStyle}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={favColor}
            onPress={() => this.setState({ addOrFavorite: 'favorite' })}
          >
            <Text style={textStyle}>Favourites</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderSearchBar() {
    if (this.state.displaySearch) {
      return (
        <View style={style.textInputContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="rgba(255,255, 255,0.8)"
            style={{
              flex: 3,
              fontFamily: 'SFProDisplay-Regular',
              color: 'rgba(255,255, 255, 0.8)',
            }}
            onChangeText={text => this.setState({ searchText: text })}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
          <MaterialIcons name="search" size={20} color="rgba(255,255,255,0.8)" />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={style.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        {/* add-circle-outline */}
        <Header
          text="Address Book"
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          onLeftIconPress={this.onLeftIconPress}
          isRightBtnImage={false}
          rightButtonIcon="add-circle-outline"
          rightIconSize={22}
          rightIconColor="#fff"
          onRightIconPress={() => this.onRightIconPress()}
          secondaryButtonIcon={whiteSearchIcon}
          onSecondaryIconPress={this.onSecondaryIconPress}
          leftButtonStyle={{ marginLeft: -10 }}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />

        <View style={style.addressList}>
          {/* Background Image */}
          <Image style={style.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />
          {/* Displays RECENT and FAVOURITE buttons */}
          {this.renderMidButtons()}

          <View style={style.displaySearch}>
            {/* Displays search Bar */}
            {this.renderSearchBar()}
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: DEVICE_HEIGHT }}>
              {this.renderAddressList()}
              <View style={{ height: DEVICE_HEIGHT * 0.3 }} />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  addresses: state.addressBookReducer.addresses,
});

const mapDispatchToProps = dispatch => ({
  addNewAddress: (walletAddress, name) => {
    dispatch({ type: AddressAction.ADD_ADDRESS, address: walletAddress, name: name || '' });
  },
  toggleAddress: walletAddress => {
    dispatch({ type: AddressAction.FAVOURITE_ADDRESS, address: walletAddress });
  },
  deleteAddress: walletAddress => {
    dispatch({ type: AddressAction.DELETE_ADDRESS, address: walletAddress });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBook);
