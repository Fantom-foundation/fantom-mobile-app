/* eslint-disable global-require */
// Library
import React, { Component } from 'react';
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

import { routes } from '~/navigation';
// Components
import Header from '~/components/Header/index';
import styles from './styles';
import Dialogbox from './dialogBox/index';
import qrCode from '~/images/QR.png';
import {
  addNewAddress as addNewAddressAction,
  updateContact as updateContactAction,
} from '~/redux/addressBook/actions';

/**
 * EditContact: This component is meant for functionality of Contact editing in App.
 */
class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: '',
      dialogBox: false,
      headerText: 'Add Contact',
    };
    this.onLeftIconPress = this.onLeftIconPress.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params && params.name && params.address) {
      this.setState({
        name: params.name,
        address: params.address,
        headerText: 'Edit Contact',
      });
    }
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  /**
   * onConfirmClick()  : This function is called when user clicks on Confirm button ,
   *  to confirm changes done in contact.
   */
  onConfirmClick() {
    if (this.state.name !== '' && this.state.address !== '') {
      const { params } = this.props.navigation.state;
      const isEditMode = params && params.name && params.address;
      const { name } = this.state;
      const { address } = this.state;
      const addressExist = this.props.addresses[address];
      if (addressExist && !isEditMode) {
        this.setState({
          dialogBox: true,
        });
      } else {
        const isValid = Web3.utils.isAddress(address);
        if (!isValid) {
          Alert.alert('Error', 'Please enter valid address.');
          return;
        }

        if (isEditMode) {
          this.props.updateContact(params.address, this.state.address, this.state.name);
          Alert.alert('Success', 'Address updated successfully.', [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              },
              style: 'cancel',
            },
          ]);
        } else {
          this.props.addNewAddress(address, name);
          // Alert.alert('Success', 'Address added successfully.');
          Alert.alert('Success', 'Address updated successfully.', [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              },
              // style: 'cancel',
            },
          ]);
          this.setState({
            name: '',
            address: '',
          });
        }
      }
    }
  }

  onTextFieldFocus() {
    let scrollValue = Platform.OS === 'ios' ? 50 : 200;

    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  }

  onTextFieldBlur() {
    let scrollValue = Platform.OS === 'ios' ? 0 : 0;

    setTimeout(() => {
      this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true });
    }, 10);
  }

  /**
   * @param {*} address : address conatins QR Address , scaned by QR Scanner.
   */
  onScanSuccess(address) {
    this.setState({
      address,
    });
  }

  /**
   * openScanner(): This function is meant for opening QRScanner to scan the address in QR code.
   */
  openScanner() {
    this.props.navigation.navigate(routes.root.QRScanner, {
      onScanSuccess: this.onScanSuccess.bind(this),
    });
  }

  closeDialogBox() {
    this.setState({
      dialogBox: false,
    });
  }

  renderConfirmButton() {
    return (
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={styles.confirmButtonOuterContainer}
          onPress={() => this.onConfirmClick()}
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
    );
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          text={this.state.headerText}
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          onLeftIconPress={this.onLeftIconPress}
          leftIconSize={30}
          textStyle={styles.headerComponentText}
          headerStyle={styles.headerComponent}
        />

        <ScrollView
          ref={scroll => (this.scrollView = scroll)}
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
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
                style={styles.enteredTextStyle}
                placeholder="Enter wallet address"
                placeholderTextColor="#a7a7a7"
                autoCorrect={false}
                onFocus={() => this.onTextFieldFocus()}
                onBlur={() => this.onTextFieldBlur()}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity style={styles.iconContainer} onPress={() => this.openScanner()}>
                <Image source={qrCode} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Name TextInput View */}
          <View style={styles.nameContainer}>
            <Text style={styles.inputTextHeading}>Name</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={styles.enteredTextStyle}
                placeholder="Enter name"
                placeholderTextColor="#a7a7a7"
                autoCorrect={false}
                onFocus={() => this.onTextFieldFocus()}
                onBlur={() => this.onTextFieldBlur()}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          {/* Confirm container */}
          {this.renderConfirmButton()}
        </ScrollView>

        {this.state.dialogBox && <Dialogbox onConfirm={() => this.closeDialogBox()} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  addresses: state.addressBook,
});
const mapDispatchToProps = {
  addNewAddress: addNewAddressAction,
  updateContact: updateContactAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact);
