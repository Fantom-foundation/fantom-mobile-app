import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import Web3 from 'web3';
import PropTypes from 'prop-types';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import SortMenuCard from '../../../general/sortMenuCard/index';
// import Button from '../../../general/button';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../common/constants';

// import qrCode from '../../../images/QR_code.png';
// import user from '../../../images/user.png';
import person from '../../../images/person_whiteOutline.png';
import qrCode from '../../../images/QR.png';
import BackgroundIcon from '../../../images/BackgroundIcon.png';
import SendIcon from '../../../images/sendWhite.png';

import style from './style';
/**
 * To Display WithdrawTab related tasks
 */
export default class WithdrawScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSortMenu: false,
      // data: [
      //   { id: 0, key: 'FANTOM', sc: 'FTM' },
      //   { id: 1, key: 'FANTOM POINT', sc: 'FP' },
      //   { id: 2, key: 'ETHEREUM', sc: 'ETH' },
      // ],
      val: 'FTM',
      // index: 0,
      address: '',
      amount: '',
      fees: '',
      memo: '',
    };
  }

  onContactPress() {
    this.props.navigation.navigate('AddressBook', {
      isEditMode: true,
      onSelection: this.onScanSuccess.bind(this),
    });
  }

  onFocus() {
    // const moveBy = DEVICE_HEIGHT <= 568 ? 690 - DEVICE_HEIGHT : 740 - DEVICE_HEIGHT;
    // if (moveBy > 0) {
    this.scrollView.scrollTo({ x: 0, y: DEVICE_HEIGHT * 0.18, animated: true });
    // }
  }

  onBlur() {
    Keyboard.dismiss();
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  }

  /**
   * onScanSuccess()  : This function is meant to set address when user clicks on scanner button.
   */
  onScanSuccess(address) {
    this.setState({
      address,
    });
  }

  onScannerPress() {
    this.props.navigation.navigate('QRScanner', { onScanSuccess: this.onScanSuccess.bind(this) });
  }

  // setAllAmountToPrice() {
  //   const { maxFantomBalance } = this.props;
  //   const ftmBalance = Number(maxFantomBalance)
  //     .toFixed(4)
  //     .toString();
  //   const maxFantomBalanceStr = maxFantomBalance.toString();
  //   this.setState({
  //     amount: ftmBalance,
  //     actualAmount: maxFantomBalanceStr,
  //   });
  // }

  // handleClickOnScreen() {
  //   const { openSortMenu } = this.state;
  //   if (openSortMenu) {
  //     this.setState({
  //       openSortMenu: !openSortMenu,
  //     });
  //   }
  // }

  // handleSortMenu(item) {
  //   const { openSortMenu } = this.state;
  //   this.setState({
  //     openSortMenu: !openSortMenu,
  //   });
  //   if (item && item.sc) {
  //     this.setState({
  //       val: item.sc,
  //       index: item.id,
  //     });
  //   }
  // }

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, amount, fees, memo, actualAmount } = this.state;
    const coin = this.state.val;
    let message = '';
    if (address === '') {
      message = 'Please enter address.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Please enter valid address.';
    } else if (amount === '') {
      message = 'Please enter valid amount';
    }
    // else if (fees === '') {
    //   message = 'Please enter valid fees.';
    // }
    if (message !== '') {
      Alert.alert('Error', message);
      return;
    }
    this.props.navigation.navigate('SendMoney', {
      address,
      amount: actualAmount,
      coin,
      memo,
      fees,
      reload: this.reload.bind(this),
      maxFantomBalance: this.props.maxFantomBalance,
    });
  }

  /**
   * reload() :  on screen reload reset the fields.
   */
  reload() {
    this.setState({
      val: 'FTM',
      address: '',
      amount: '',
      actualAmount: '',
      fees: '',
      memo: '',
    });
  }

  renderAmountContainer(ftmBalance) {
    return (
      <View style={style.amtContainer}>
        <View style={style.balanceHeadingContainer}>
          <Text style={style.balanceHeadingTextStyle}>Balance</Text>
        </View>
        <View style={style.balanceViewText}>
          <Text numberOfLines={1} style={style.balanceViewTextOne}>
            {ftmBalance} {this.state.val}
          </Text>
        </View>
      </View>
    );
  }

  renderAddressContainer() {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Address to send</Text>
        <View style={style.textInputContainer}>
          <TextInput
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            style={style.enteredTextStyle}
            placeholder="Enter Address"
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={style.iconContainer} onPress={() => this.onScannerPress()}>
            <Image source={qrCode} style={{ width: 25, height: 25 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={style.iconContainer} onPress={() => this.onContactPress()}>
            <Image
              source={person}
              style={{ width: 22, height: 22, marginRight: 3 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPriceContainer() {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Price</Text>
        <View style={style.textInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={amount => this.setState({ amount, actualAmount: amount })}
            value={`${this.state.amount}`}
            placeholder="Enter Amount"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            underlineColorAndroid="transparent"
          />
          <View style={style.priceSubContainer}>
            <Text style={style.priceTextStyle}>FTM</Text>
          </View>
          <View style={[style.priceSubContainer, { backgroundColor: 'rgb(0,177,251)' }]}>
            <Text style={[style.priceTextStyle, { fontFamily: 'SFProDisplay-Semibold' }]}>ALL</Text>
          </View>
        </View>
      </View>
    );
  }

  renderMemoContainer() {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Memo</Text>
        <View style={style.memoTextInputContainer}>
          <TextInput
            style={style.enteredTextStyle}
            placeholderTextColor="rgba( 255, 255, 255, 0.2)"
            autoCorrect={false}
            onChangeText={memo => this.setState({ memo })}
            value={this.state.memo}
            placeholder="Enter Memo"
            autoCapitalize="none"
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            multiline
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }

  renderConfirmButton() {
    return (
      <View style={style.confirmContainer}>
        <TouchableOpacity
          style={style.confirmButtonOuterContainer}
          onPress={() => this.handleSendMoney()}
        >
          <View style={style.confirmButtonInnerContainer}>
            <Image
              source={SendIcon}
              style={{
                height: DEVICE_WIDTH * 0.09,
                width: DEVICE_WIDTH * 0.09,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <Text style={style.confirmTextStyle}>Send</Text>
      </View>
    );
  }

  render() {
    // const dynamicStyle = this.state.openSortMenu ? { opacity: 0.2 } : '';
    // const ViewUse = this.state.openSortMenu ? TouchableOpacity : View;
    const ftmBalance = Number(this.props.maxFantomBalance).toFixed(6);
    return (
      <View style={style.mainContainerStyle}>
        <Image style={style.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
        <ScrollView
          ref={scroll => {
            this.scrollView = scroll;
          }}
          style={[
            { flex: 1 },
            // dynamicStyle
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.topMarginContainer} />
          {this.renderAmountContainer(ftmBalance)}
          {/* Address to send */}
          {this.renderAddressContainer()}
          {/* Price container */}
          {this.renderPriceContainer()}
          {/* Memo container */}
          {this.renderMemoContainer()}
          {/* Confirm container */}
          {this.renderConfirmButton()}
          <View style={{ height: DEVICE_HEIGHT * 0.1 }} />
        </ScrollView>
      </View>

      // <ViewUse
      //   activeOpacity={1}
      //   style={style.withdrawViewStyle}
      //   onPress={() => this.handleClickOnScreen()}
      // >
      //   <ScrollView
      //     ref={scroll => {
      //       this.scrollView = scroll;
      //     }}
      //     style={[{ flex: 1 }, dynamicStyle]}
      //     showsVerticalScrollIndicator={false}
      //   >
      //     <View style={style.sendContainer}>
      //       <Text style={style.sendText}>Send</Text>
      //     </View>

      //     <View style={style.addressContainer}>
      //       <Text style={style.addressText}>Address to send</Text>
      //       <View style={style.addressTextInputContainer}>
      //         <TextInput
      //           onChangeText={address => this.setState({ address })}
      //           value={this.state.address}
      //           style={style.addressTextInput}
      //           placeholder="Enter Address"
      //           placeholderTextColor="#a7a7a7"
      //           autoCapitalize="none"
      //         />
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             padding: 5,
      //             justifyContent: 'space-around',
      //             width: 80,
      //           }}
      //         >
      //           <TouchableOpacity
      //             onPress={() => this.onScannerPress()}
      //             style={{ width: 40, height: 28, alignItems: 'center' }}
      //           >
      //             <Image source={qrCode} style={{ width: 28, height: 28 }} />
      //           </TouchableOpacity>
      //           <TouchableOpacity
      //             onPress={() => this.onContactPress()}
      //             style={{ width: 40, height: 28, alignItems: 'center' }}
      //           >
      //             <Image source={user} style={{ width: 26, height: 26 }} />
      //           </TouchableOpacity>
      //         </View>
      //       </View>
      //     </View>

      //     <View style={style.priceContainer}>
      //       <View style={style.priceTextContainer}>
      //         <Text style={style.price}>Price</Text>
      //       </View>
      //       <View style={style.addressTextInputContainer}>
      //         <TextInput
      //           onChangeText={amount => this.setState({ amount, actualAmount: amount })}
      //           value={`${this.state.amount}`}
      //           style={style.priceTextInput}
      //           placeholder="Enter Amount"
      //           keyboardType="decimal-pad"
      //           placeholderTextColor="#a7a7a7"
      //           autoCapitalize="none"
      //         />
      //         <TouchableOpacity
      //           onPress={() => this.handleSortMenu()}
      //           style={{ flexDirection: 'row', padding: 2 }}
      //         >
      //           <View style={style.sc}>
      //             <Text>{this.state.val}</Text>
      //           </View>
      //           <Icon name="arrow-drop-down" size={24} color="black" />
      //         </TouchableOpacity>
      //       </View>
      //       <View style={style.availableContainer}>
      //         <View
      //           style={{
      //             alignItems: 'flex-end',
      //             paddingRight: 10,
      //             width: DEVICE_WIDTH * 0.8,
      //           }}
      //         >
      //           <Text>Available to Transfer:</Text>
      //           <Text> {ftmBalance} FTM </Text>
      //         </View>
      //         <View style={style.allContainer}>
      //           <TouchableOpacity
      //             onPress={() => this.setAllAmountToPrice()}
      //             style={{ flexDirection: 'row', padding: 2 }}
      //           >
      //             <Text>all</Text>
      //           </TouchableOpacity>
      //         </View>
      //       </View>
      //     </View>

      //     {/* uncomment this for displaying the transfer fees amount view

      //     <View style={style.feesContainer}>
      //       <Text style={style.feesText}>Fees</Text>
      //       <View style={style.addressTextInputContainer}>
      //         <TextInput
      //           onChangeText={(fees) => this.setState({ fees })}
      //           value={this.state.fees}
      //           style={style.feesTextInput}
      //           placeholder='Enter Fees'
      //           keyboardType='decimal-pad'
      //           placeholderTextColor='#a7a7a7'
      //           autoCapitalize='none'
      //         // onFocus={this.onFocus.bind(this)}
      //         // onBlur={this.onBlur.bind(this)}
      //         >
      //         </TextInput>
      //         <View style={style.ftmTextContainer}>
      //           <Text style={style.ftmText}>0.0000002  FTM</Text>
      //         </View>
      //       </View>
      //       <View style={style.speedContainer}>
      //         <View>
      //           <View style={style.slowBar}>
      //           </View>
      //           <Text style={style.slowText}>Slow</Text>
      //         </View>
      //         <View>
      //           <View style={style.normalBar}>
      //           </View>
      //           <Text style={style.normalText}>Normal</Text>
      //         </View>
      //         <View>
      //           <View style={style.fastBar}>
      //           </View>
      //           <Text style={style.fastText}>Fast</Text>
      //         </View>
      //       </View>
      //     </View> */}

      //     <View style={style.addressContainer}>
      //       <Text style={style.addressText}>Memo</Text>
      //       <View style={style.addressTextInputContainer}>
      //         <TextInput
      //           onChangeText={memo => this.setState({ memo })}
      //           value={this.state.memo}
      //           style={style.addressTextInput}
      //           placeholder="Enter Memo"
      //           placeholderTextColor="#a7a7a7"
      //           onFocus={() => this.onFocus()}
      //           onBlur={() => this.onBlur()}
      //           autoCapitalize="none"
      //         />
      //       </View>
      //     </View>
      //     {/* </View> */}

      //     <View style={style.bottomSendContainer}>
      //       <Button
      //         text="Send"
      //         buttonStyle={{ backgroundColor: '#EEBD12', alignSelf: 'center', height: 50 }}
      //         textStyle={{ color: '#000', fontWeight: 'normal' }}
      //         onPress={() => this.handleSendMoney()}
      //       />
      //     </View>
      //   </ScrollView>
      //   {this.state.openSortMenu && (
      //     <View
      //       style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, zIndex: 1, position: 'absolute' }}
      //     />
      //   )}
      //   {this.state.openSortMenu && (
      //     <SortMenuCard
      //       handleSortMenu={item => this.handleSortMenu(item)}
      //       data={this.state.data}
      //       type="withDraw"
      //       index={this.state.index}
      //     />
      //   )}
      // </ViewUse>
    );
  }
}

WithdrawScreen.propTypes = {
  navigation: PropTypes.object,
};
