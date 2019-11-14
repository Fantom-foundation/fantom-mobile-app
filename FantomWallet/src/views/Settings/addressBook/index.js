/* eslint-disable no-restricted-syntax */
// @flow
import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity,
  Image, ScrollView, TextInput,
  Alert, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NavigationService, routes } from '~/navigation/helpers';
import Header from '~/components/Header';
import styles from './styles';
import Address from './Address';
import whiteSearchIcon from '~/images/searchWhite.png';
import BackgroundImage from '~/images/BackgroundIcon.png';
import {
  addNewAddress as addNewAddressAction,
  toggleAddress as toggleAddressAction,
  deleteAddress as deleteAddressAction,
} from '~/redux/addressBook/actions';

import { DEVICE_HEIGHT } from '~/common/constants';

type Props = {
  addresses: { [string]: any },
  toggleAddress: string => void,
  deleteAddress: string => void,
  navigation: {
    navigate: (route: string, ?{ [string]: string }) => void,
    goBack: () => void,
    getParam: (string, ?any) => void,
  },
};

/**
 * AddressBook: This component is meant for handling actions related to Address Book in app.
 */
export const AddressBookContainer = ({ addresses, toggleAddress, deleteAddress, navigation }: Props) => {
  const [addOrFavorite, setAddOrFavorite] = useState('add');
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onLeftIconPress = () => {
    navigation.goBack();
  };

  const onSecondaryIconPress = () => {
    setDisplaySearch(!displaySearch);
    setSearchText('');
  };

  const onRightIconPress = () => NavigationService.navigate(routes.root.EditContact);


  const onSelection = address => {
    const callbackFunc = navigation.getParam('onSelection', null);
    if (callbackFunc) {
      callbackFunc(address);
      navigation.goBack();
    }
  };

  const rateChange = (address: string) => toggleAddress(address);

  const handleEditContact = (name, address) => {
    NavigationService.navigate(routes.root.EditContact, { name, address });
  };

  const deleteItem = (address: string) => {
    Alert.alert('Confirm Dialog', 'Are you sure you want to delete this contact.', [
      { text: 'Cancel', onPress: () => { }, style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          deleteAddress(address);
        },
      },
    ]);
  };

  const renderAddressList = () => {
    const isEditMode = navigation.getParam('isEditMode', false);
    const addressListView = [];
    const favoriteListView = [];
    const addressesStored = addresses;
    if (addressesStored) {
      const _addresses = {};
      let objArr = Object.keys(addressesStored).map(key => addressesStored[key]);
      objArr = objArr.sort((a, b) => {
        if (a.timeStamp && b.timeStamp) {
          return new Date(b.date) - new Date(a.date);
        }
        return 1;
      });
      for (const obj of objArr) {
        _addresses[obj.address] = obj;
      }
      for (const key in _addresses) {
        if (Object.prototype.hasOwnProperty.call(_addresses, key)) {
          const tempAddress = addresses[key];
          if (displaySearch && searchText !== '') {
            const _searchText = searchText.toLowerCase();
            const name = tempAddress.name.toLowerCase();
            const addressLower = tempAddress.address.toLowerCase();
            if (!(name.includes(_searchText) || addressLower.includes(_searchText))) {
              continue; //eslint-disable-line
            }
          }
          addressListView.push(
            <Address
              key={key}
              id={tempAddress.address}
              isEditMode={!!isEditMode}
              onSelection={onSelection}
              index={key}
              name={tempAddress.name}
              line1Text={tempAddress.address}
              rate={tempAddress.isFavourite}
              rateChange={rateChange}
              delete={deleteItem}
              handleEditContact={handleEditContact}
            />,
          );
          if (tempAddress.isFavourite) {
            favoriteListView.push(
              <Address
                key={key}
                id={tempAddress.address}
                isEditMode={!!isEditMode}
                onSelection={onSelection}
                index={key}
                name={tempAddress.name}
                line1Text={tempAddress.address}
                rate={tempAddress.isFavourite}
                rateChange={rateChange}
                delete={deleteItem}
                handleEditContact={handleEditContact}
              />,
            );
          }
        }
      }
    }
    if (addOrFavorite === 'favorite') {
      return favoriteListView;
    }
    return addressListView;
  };

  const renderMidButtons = () => {
    let addColor = styles.add;
    let favColor = styles.favorites;
    const textStyle = { color: '#FFF', fontFamily: 'SFProDisplay-Semibold' };

    if (addOrFavorite === 'add') {
      addColor = { ...styles.add, backgroundColor: 'rgb(0,177,251)' };
      favColor = styles.favorites;
    } else if (addOrFavorite === 'favorite') {
      favColor = { ...styles.favorites, backgroundColor: 'rgb(0,177,251)' };
      addColor = styles.add;
    }
    if (!displaySearch) {
      return (
        <View style={styles.subHeader}>
          <TouchableOpacity style={addColor} onPress={() => setAddOrFavorite('add')}>
            <Text style={textStyle}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={favColor} onPress={() => setAddOrFavorite('favorite')}>
            <Text style={textStyle}>Favourites</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderSearchBar = () => {
    if (displaySearch) {
      return (
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="rgba(255,255, 255,0.8)"
            style={{
              flex: 3,
              fontFamily: 'SFProDisplay-Regular',
              color: 'rgba(255,255, 255, 0.8)',
            }}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
          <MaterialIcons name="search" size={20} color="rgba(255,255,255,0.8)" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.mainContainerStyle}>
      <StatusBar barStyle="light-content" />
      {/* add-circle-outline */}
      <Header
        text="Address Book"
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        onLeftIconPress={onLeftIconPress}
        isRightBtnImage={false}
        rightButtonIcon="add-circle-outline"
        rightIconSize={22}
        rightIconColor="#fff"
        onRightIconPress={() => onRightIconPress()}
        secondaryButtonIcon={whiteSearchIcon}
        onSecondaryIconPress={onSecondaryIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />

      <View style={styles.addressList}>
        {/* Background Image */}
        <Image style={styles.backgroundImageStyle} source={BackgroundImage} resizeMode="contain" />
        {/* Displays RECENT and FAVOURITE buttons */}
        {renderMidButtons()}

        <View style={styles.displaySearch}>
          {/* Displays search Bar */}
          {renderSearchBar()}
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: DEVICE_HEIGHT }}>
            {renderAddressList()}
            <View style={{ height: DEVICE_HEIGHT * 0.3 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  addresses: state.addressBook,
});

const mapDispatchToProps = {
  addNewAddress: addNewAddressAction,
  toggleAddress: toggleAddressAction,
  deleteAddress: deleteAddressAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressBookContainer);
