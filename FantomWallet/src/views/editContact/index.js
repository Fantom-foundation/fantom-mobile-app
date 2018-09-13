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
import Icon from 'react-native-vector-icons/FontAwesome';
import Web3 from 'web3';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import Dialogbox from './dialogBox/index';
import arrowLeftButton from '../../images/arrowLeft_White.png';
import checkbox from '../../images/checkbox.png';
import checkedIcon from '../../images/CheckedIcon.png';
import qrCode from '../../images/QR_code.png';
import * as AddressAction from '../../redux/addressBook/action';

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
      checked: true,
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
    console.log('onLeftIconPressonLeftIconPress');
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
          Alert.alert('Success', 'Address added successfully.');
          this.setState({
            name: '',
            address: '',
          });
        }
      }
    }
  }

  onCancelClick() {
    this.props.navigation.goBack();
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
    this.props.navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
  }

  checkBoxClicked() {
    // this.setState({
    //     checked:!this.state.checked
    // })
  }

  closeDialogBox() {
    this.setState({
      dialogBox: false,
    });
  }

  render() {
    return (
      <View style={style.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          text={this.state.headerText}
          leftButtonIcon={arrowLeftButton}
          onLeftIconPress={this.onLeftIconPress}
          leftIconSize={30}
          rightIconSize={30}
          headerStyle={{ backgroundColor: 'rgb(233,177,18)' }}
          rightButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }}
          leftButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }}
        />

        <ScrollView
          ref={scroll => (this.scrollView = scroll)}
          style={style.scrollView}
          scrollEnabled={false}
        >
          <View style={style.header}>
            <View style={style.fantomContainer}>
              {/* <Icon style={style.fantomIcon} name='check-square' size={30} /> */}
              <TouchableOpacity activeOpacity={1} onPress={() => this.checkBoxClicked()}>
                <Image
                  source={this.state.checked ? checkedIcon : checkbox}
                  style={{ width: 28, height: 28 }}
                />
              </TouchableOpacity>
              <Text style={style.fantomText}>FANTOM</Text>
            </View>
            <Icon style={style.downArrowIcon} name="caret-down" size={30} />
          </View>

          <View style={style.addressContainer}>
            <Text style={style.addressText}>Address</Text>
            <View style={style.addressInputContainer}>
              <TextInput
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
                style={style.addressTextInput}
                placeholder="Enter wallet address"
                placeholderTextColor="#a7a7a7"
                autoCorrect={false}
                onFocus={() => this.onTextFieldFocus()}
                onBlur={() => this.onTextFieldBlur()}
                autoCapitalize="none"
              />
              <TouchableOpacity style={style.iconContainer} onPress={() => this.openScanner()}>
                {/* <Icon  name='address-book' size={30} />
                                <Icon style={style.qrCodeIcon} name='qrcode' size={30} /> */}
                <Image source={qrCode} style={{ width: 32, height: 32 }} />
                {/* <Image source={contact} style={{width:32,height:32}} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.nameContainer}>
            <Text style={style.nameText}>Name</Text>
            <View style={style.nameTextInputContainer}>
              <TextInput
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={style.nameTextInput}
                placeholder="Enter name"
                placeholderTextColor="#a7a7a7"
                onFocus={() => this.onTextFieldFocus()}
                onBlur={() => this.onTextFieldBlur()}
                autoCapitalize="none"
              />
            </View>
          </View>
        </ScrollView>

        <View style={style.footer}>
          <Button
            buttonStyle={style.cancelButton}
            text="Cancel"
            onPress={() => this.onCancelClick()}
          />
          <Button
            buttonStyle={style.confirmButton}
            onPress={() => this.onConfirmClick()}
            text="Confirm"
          />
        </View>
        {this.state.dialogBox && <Dialogbox onConfirm={() => this.closeDialogBox()} />}
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
  updateContact: (oldWalletAddress, newWalletAddress, name) => {
    dispatch({
      type: AddressAction.EDIT_CONTACT,
      oldWalletAddress,
      newWalletAddress,
      name: name || '',
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact);
