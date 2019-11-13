// @flow
/* eslint-disable global-require */
// Library
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Web3 from 'web3';

import { NavigationService, routes } from '~/navigation/helpers';
// Components
import Header from '~/components/Header/index';
import styles from './styles';
import Dialogbox from './dialogBox/index';
import qrCode from '~/images/QR.png';
import {
  addNewAddress as addNewAddressAction,
  updateContact as updateContactAction,
} from '~/redux/addressBook/actions';

type Props = {
  addresses: { [string]: any },
  addNewAddress: (string, string) => void,
  updateContact: (string, string, string) => void,
  navigation: any,
}
/**
 * EditContact: This component is meant for functionality of Contact editing in App.
 */
const EditContact = ({ navigation, addresses, updateContact, addNewAddress }: Props) => {
  const scrollView: any = useRef(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [dialogBox, setDialogBox] = useState(false);
  const [headerText, setHeaderText] = useState('Add Contact');

  useEffect(() => {
    const { params } = navigation.state;
    if (params && params.name && params.address) {
      setName(params.name);
      setAddress(params.address);
      setHeaderText('Edit Contact');
    }
  }, []);

  const onLeftIconPress = () => NavigationService.pop();


  /**
   * onConfirmClick()  : This function is called when user clicks on Confirm button ,
   *  to confirm changes done in contact.
   */
  const onConfirmClick = () => {
    if (name !== '' && address !== '') {
      const { params } = navigation.state;
      const isEditMode = params && params.name && params.address;
      const addressExist = addresses[address];
      if (addressExist && !isEditMode) {
        setDialogBox(true);
      } else {
        const isValid = Web3.utils.isAddress(address);
        if (!isValid) {
          Alert.alert('Error', 'Please enter valid address.');
          return;
        }

        if (isEditMode) {
          updateContact(params.address, address, name);
          Alert.alert('Success', 'Address updated successfully.', [
            {
              text: 'Ok',
              onPress: () => NavigationService.pop(),
              style: 'cancel',
            },
          ]);
        } else {
          addNewAddress(address, name);
          Alert.alert('Success', 'Address updated successfully.', [
            {
              text: 'Ok',
              onPress: () => NavigationService.pop(),
            },
          ]);
          setName('');
          setAddress('');
        }
      }
    }
  };

  const onTextFieldFocus = () => {
    const scrollValue = Platform.OS === 'ios' ? 50 : 200;

    setTimeout(() => {
      scrollView.current.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  };

  const onTextFieldBlur = () => {
    const scrollValue = Platform.OS === 'ios' ? 0 : 0;

    setTimeout(() => {
      scrollView.current.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  };

  /**
   * @param {*} address : address conatins QR Address , scaned by QR Scanner.
   */
  const onScanSuccess = (_address) => {
    setAddress(_address);
  };

  /**
   * openScanner(): This function is meant for opening QRScanner to scan the address in QR code.
   */
  const openScanner = () => {
    NavigationService.navigate(routes.root.QRScanner, {
      onScanSuccess,
    });
  };

  const closeDialogBox = () => setDialogBox(false);

  return (
    <View style={styles.mainContainerStyle}>
      <StatusBar barStyle="light-content" />
      <Header
        text={headerText}
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        onLeftIconPress={onLeftIconPress}
        leftIconSize={30}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />

      <ScrollView
        ref={scrollView}
        style={styles.scrollView}
        scrollEnabled={false}
      >
        {/* Background Image */}
        <Image
          style={styles.backgroundImageStyle}
          source={require('~/images/BackgroundIcon.png')}
          resizeMode="contain"
        />
        {/* Address text Input View */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Address</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={setAddress}
              value={address}
              style={styles.enteredTextStyle}
              placeholder="Enter wallet address"
              placeholderTextColor="#a7a7a7"
              autoCorrect={false}
              onFocus={onTextFieldFocus}
              onBlur={onTextFieldBlur}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.iconContainer} onPress={openScanner}>
              <Image source={qrCode} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Name TextInput View */}
        <View style={styles.nameContainer}>
          <Text style={styles.inputTextHeading}>Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={setName}
              value={name}
              style={styles.enteredTextStyle}
              placeholder="Enter name"
              placeholderTextColor="#a7a7a7"
              autoCorrect={false}
              onFocus={onTextFieldFocus}
              onBlur={onTextFieldBlur}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        {/* Confirm container */}
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmButtonOuterContainer}
            onPress={onConfirmClick}
          >
            <View style={styles.confirmButtonInnerContainer}>
              <Image
                source={require('~/images/Tick.png')}
                style={styles.confirmImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.confirmTextStyle}>Confirm</Text>
        </View>
      </ScrollView>

      {dialogBox && <Dialogbox onConfirm={closeDialogBox} />}
    </View >
  );
};

const mapStateToProps = state => ({
  addresses: state.addressBook,
});
const mapDispatchToProps = {
  addNewAddress: addNewAddressAction,
  updateContact: updateContactAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContact);
