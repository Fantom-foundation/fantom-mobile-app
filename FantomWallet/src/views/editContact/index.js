import React, { Component } from 'react';
import { Text, View, TextInput, CheckBox, ScrollView, Platform,Image,TouchableOpacity, Alert, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialogbox from './dialogBox/index';
import arrowLeftButton from '../../images/arrowLeft_White.png'
import deleteButton from '../../images/deleteWhite.png';
import checkbox from '../../images/checkbox.png';
import checkedIcon from '../../images/CheckedIcon.png'
import contact from '../../images/contact.png';
import qrCode from '../../images/QR_code.png'
import * as AddressAction from '../../redux/addressBook/action';
import Web3 from 'web3';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class EditContact extends Component {
    onLeftIconPress = () => {
        console.log('onLeftIconPressonLeftIconPress');
        this.props.navigation.goBack()
    }
    state = {
        address: '',
        name: '',
        dialogBox: false,
        checked:true
    }


    onConfirmClick() {
        console.log('console function')

      if (this.state.name !== '' && this.state.address !== '') {
        const name = this.state.name;
        const address = this.state.address;
        const addressExist = this.props.addresses[address];
        if (addressExist) {
          this.setState({
            dialogBox: true
        })
        } else {
          const isValid = Web3.utils.isAddress(address);
          if (!isValid) {
            Alert.alert('Error', 'Please enter valid address.');
            return;
          }
          this.props.addNewAddress(address, name);
          Alert.alert('Success', 'Address added successfully.');
          this.setState({
            name: '',
            address: '',
          })
        }
      }
    }
    onCancelClick() {
        this.props.navigation.goBack();
    }
    closeDialogBox() {
        this.setState({
            dialogBox: false
        })
    }
    checkBoxClicked(){
        // this.setState({
        //     checked:!this.state.checked
        // })
    }
    onTextFieldFocus() {
        let scrollValue = (Platform.OS === 'ios') ? 50 : 200

        setTimeout(() => {
            this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
        }, 10);

    }
    onTextFieldBlur() {
        let scrollValue = (Platform.OS === 'ios') ? 0 : 0

        setTimeout(() => {
            this.scrollView.scrollTo({ x: 0, y: scrollValue, animated: true })
        }, 10);
    }

    openScanner() {
      this.props.navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
    }

    onScanSuccess(address) {
      this.setState({
        address,
      });
    }

    render() {
        return (
            <View style={style.mainContainerStyle}>
                <StatusBar barStyle="light-content" />
                <Header text='Add Contact' leftButtonIcon={arrowLeftButton} onLeftIconPress={this.onLeftIconPress} leftIconSize={30} rightIconSize={30} headerStyle={{ backgroundColor: 'rgb(233,177,18)' }} rightButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }} leftButtonStyle={{ backgroundColor: 'rgb(233,177,18)' }} />

                <ScrollView ref={(scroll) => this.scrollView = scroll}
                    style={style.scrollView}
                    scrollEnabled={false}
                >
                    <View style={style.header}>
                        <View style={style.fantomContainer}>

                            {/* <Icon style={style.fantomIcon} name='check-square' size={30} /> */}
                            <TouchableOpacity activeOpacity={1}  onPress={() => this.checkBoxClicked()}>
                            <Image source={this.state.checked ? checkedIcon:checkbox} style={{width:28,height:28}}/>
                            </TouchableOpacity>
                            <Text style={style.fantomText}>FANTOM</Text>
                        </View>
                        <Icon style={style.downArrowIcon} name='caret-down' size={30} />
                    </View>


                    <View style={style.addressContainer}>
                        <Text style={style.addressText}>Address</Text>
                        <View style={style.addressInputContainer}>
                            <TextInput
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                                style={style.addressTextInput}
                                placeholder='Enter wallet address'
                                placeholderTextColor='#a7a7a7'
                                autoCorrect={false}
                                onFocus={() => this.onTextFieldFocus()}
                                onBlur={() => this.onTextFieldBlur()}
                                autoCapitalize='none'
                            />
                            <TouchableOpacity style={style.iconContainer} onPress={this.openScanner.bind(this)}>
                                {/* <Icon  name='address-book' size={30} />
                                <Icon style={style.qrCodeIcon} name='qrcode' size={30} /> */}
                                <Image source={qrCode} style={{width:32,height:32}} />
                                {/* <Image source={contact} style={{width:32,height:32}} /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.nameContainer}>
                        <Text style={style.nameText}>Name</Text>
                        <View style={style.nameTextInputContainer}>
                            <TextInput
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                style={style.nameTextInput}
                                placeholder='Enter name'
                                placeholderTextColor='#a7a7a7'
                                onFocus={() => this.onTextFieldFocus()}
                                onBlur={() => this.onTextFieldBlur()}
                                autoCapitalize='none'
                            />

                        </View>
                    </View>

                </ScrollView>

                <View style={style.footer}>
                    <Button buttonStyle={style.cancelButton} text="Cancel" onPress={() => this.onCancelClick()}/>
                    <Button buttonStyle={style.confirmButton} onPress={() => this.onConfirmClick()} text="Confirm" />
                </View>
                {
                    this.state.dialogBox && <Dialogbox onConfirm={() => this.closeDialogBox()}/>
                }

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
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);




{/* <View style={{ flex: 1, flexDirection: 'row',backgroundColor:'red', borderColor: 'rgb(179,179,179)', borderRadius: 2, borderWidth: 1,
                         marginTop: deviceHeight * 0.01,  }}>
                            <TextInput
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                                style={{ flex: 7, fontSize: 16 }}
                                placeholder='Enter Wallet Address'
                            />
                            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon style={{ color: 'grey' }} name='address-book' size={30} />

                                <Icon style={{ color: 'grey' }} name='qrcode' size={30} />
                            </View>
                        </View> */}