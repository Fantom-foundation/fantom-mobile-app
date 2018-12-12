import '../../../global';
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Button from '../../general/button/index';
// import TextField from './TextField';
import Header from '../../general/header/index';
import Loading from '../../general/loader/index';
import transferMoney from './transfer';
import { SUCCESS, SENT, FAILED, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../common/constants';

import style from './style';

import * as AddressAction from '../../redux/addressBook/action';
import * as TransactionAction from '../../redux/transactions/action';

// import person from '../../images/person_whiteOutline.png';
// import qrCode from '../../images/QR.png';
import BackgroundIcon from '../../images/BackgroundIcon.png';
import fantomIcon from '../../images/FantomWalletWhiteIcon.png';

class SendMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      val: 'FTM',
    };
    this.isConfirmationRecieved = false;
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  onConfirmHandler() {
    const { address, amount, memo, maxFantomBalance } = this.props.navigation.state.params;
    if (amount === 0 || amount > maxFantomBalance) {
      Alert.alert('Error', 'Please enter valid amount.');
    } else {
      this.transferMoney(this.props.publicKey, address, amount, memo);
      // console.warn(amount, maxFantomBalance, 'amount');
    }
  }

  transferMoney(from, to, value, memo) {
    this.setState({ isLoading: true });
    const date = moment().format('YYYY-MMM-DD hh:mm:ss a');

    transferMoney(from, to, value, memo, this.props.privateKey)
      .then(data => {
        if (data.hash && data.hash !== '') {
          this.setState({ isLoading: false });
          const transaction = {
            type: SENT,
            amount: value,
            transactionId: '',
            transactionStatus: SUCCESS,
            amountUnit: 'FTM',
            from,
            to,
            isError: false,
            date,
          };
          this.props.addTransactionToStore(transaction);
          Alert.alert('Success', `Transfer successful with transaction hash: ${data.hash}`, [
            // { text: 'Copy', onPress: () => { Clipboard.setString(data.hash); } },
            { text: 'Ok', onPress: () => this.alertSuccessfulButtonPressed(), style: 'cancel' },
          ]);
          return;
        }
        Alert.alert('Success', 'Transfer successful.', [
          { text: 'Ok', onPress: () => this.alertSuccessfulButtonPressed(), style: 'cancel' },
        ]);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        const transaction = {
          type: SENT,
          amount: value,
          transactionId: '',
          transactionStatus: FAILED,
          amountUnit: 'FTM',
          from,
          to,
          isError: false,
        };
        this.props.addTransactionToStore(transaction);
        const message = err.message || 'Invalid error. Please check the data and try again.';
        Alert.alert('Error', message);
      });
  }

  alertSuccessfulButtonPressed() {
    const { address, reload } = this.props.navigation.state.params;
    const currentDate = new Date();
    this.props.addUpdateTimestampAddress(address, '', currentDate.getTime());

    if (reload) {
      reload();
    }
    this.props.navigation.goBack();
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

  renderAddressContainer(address) {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Address to send</Text>
        <View style={style.textInputContainer}>
          <TextInput value={address} style={style.valueTextStyle} editable={false} />
        </View>
      </View>
    );
  }

  renderPriceContainer(coin, amount) {
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Price</Text>
        <View style={style.textInputContainer}>
          <TextInput style={style.valueTextStyle} value={amount} editable={false} />
          <View style={style.priceSubContainer}>
            <Text style={style.priceTextStyle}>{coin}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderMemoContainer(memoValue) {
    let multilineCheck = false;
    let match = /\r|\n/.exec(memoValue); // Checks for multi-line in memo text
    if (match) {
      multilineCheck = true;
    }
    return (
      <View style={style.addressContainer}>
        <Text style={style.inputTextHeading}>Memo</Text>
        <View style={multilineCheck ? style.textInputContainer : style.memoTextInputContainer}>
          <TextInput
            style={style.valueTextStyle}
            value={memoValue}
            multiline={multilineCheck}
            editable={false}
          />
        </View>
      </View>
    );
  }

  renderAttentionConatiner() {
    return (
      <View style={style.attentionMainContainer}>
        <MaterialIcons name="warning" color="rgb(245, 206, 0)" size={24} />
        <Text style={style.attentionTextStyle}>Attention</Text>
        <Text style={style.warningTextStyle}>
          Please make sure the above information is correct.
        </Text>
      </View>
    );
  }

  renderConfirmButton() {
    return (
      <View style={style.confirmContainer}>
        <TouchableOpacity
          style={style.confirmButtonOuterContainer}
          onPress={() => this.onConfirmHandler()}
        >
          <View style={style.confirmButtonInnerContainer}>
            <FontAwesome5 name="check" color="#FFF" size={DEVICE_WIDTH * 0.09} />
          </View>
        </TouchableOpacity>
        <Text style={style.confirmTextStyle}>Confirm</Text>
      </View>
    );
  }

  render() {
    const { address, coin, amount, memo, maxFantomBalance } = this.props.navigation.state.params;
    const ftmBalance = Number(maxFantomBalance).toFixed(6);
    return (
      <View style={style.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          fantomIcon={fantomIcon}
          leftButtonStyle={{ marginLeft: -10 }}
          onLeftIconPress={() => this.onLeftIconPress()}
          textStyle={{ fontFamily: 'SFProDisplay-Semibold' }}
          headerStyle={{
            backgroundColor: 'rgb(44,52,58)',
            height: DEVICE_HEIGHT < 810 ? 84 : (106 / 812) * DEVICE_HEIGHT,
          }}
        />
        <Image style={style.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
        <ScrollView
          ref={scroll => {
            this.scrollView = scroll;
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.topMarginContainer} />
          {this.renderAmountContainer(ftmBalance)}
          {/* Address to send */}
          {this.renderAddressContainer(address)}
          {/* Price container */}
          {this.renderPriceContainer(coin, amount)}
          {/* Memo container */}
          {this.renderMemoContainer(memo)}
          {/* Attention Container */}
          {this.renderAttentionConatiner()}
          {/* Confirm container */}
          {this.renderConfirmButton()}
          <View style={{ height: DEVICE_HEIGHT * 0.1 }} />
        </ScrollView>
        {this.state.isLoading && <Loading />}
      </View>
    );
  }
}
// render() {
//   const { address, coin, amount, memo } = this.props.navigation.state.params;
//   const ftmBalance = Number(amount)
//     .toFixed(4)
//     .toString();
//   return (
//     <View style={style.mainContainerStyle}>
//       <Header text="Check Send" />
//       <View style={style.mid}>
//         <View style={[style.textFieldStyle, { marginTop: 40 }]}>
//           <TextField
//             // isimagePresent={true}
//             // imgUrl={require('../../images/fantom-logo-dark.png')}
//             // imgStyle={{ width: DEVICE_WIDTH * 0.2 }}
//             textinputStyle={{ width: DEVICE_WIDTH * 0.55 }}
//             isTextPresent
//             rightTextValue={coin}
//             placeHolderText="Coin"
//           />
//         </View>
//         <View style={style.textFieldStyle}>
//           <TextField placeHolderText="Address" isTextPresent rightTextValue={address} />
//         </View>
//         <View style={style.textFieldStyle}>
//           <TextField placeHolderText="Price" isTextPresent rightTextValue={ftmBalance} />
//         </View>
//         {/* <View style={style.textFieldStyle}>
//           <TextField
//             placeHolderText={'Fees'}
//             isTextPresent={true}
//             rightTextValue={fees}
//           />
//         </View> */}
//         <View style={style.textFieldStyle}>
//           <TextField
//             placeHolderText="Memo"
//             textinputStyle={{ width: DEVICE_WIDTH * 0.65 }}
//             isTextPresent
//             rightTextValue={memo}
//           />
//         </View>
//         <Text style={style.additionalInfoTextStyle}>
//           Please check if the above information is correct.
//         </Text>
//         <View style={{ height: 40 }} />
//       </View>
//       <View style={style.buttonViewStyle}>
//         <Button
//           text="Cancel"
//           buttonStyle={{ width: DEVICE_WIDTH * 0.5, backgroundColor: '#000' }}
//           onPress={() => this.props.navigation.goBack()}
//         />
//         <Button
//           text="Confirm"
//           buttonStyle={{ width: DEVICE_WIDTH * 0.5, backgroundColor: '#ECB414' }}
//           onPress={() => this.onConfirmHandler()}
//         />
//       </View>
//       {this.state.isLoading && <Loading />}
//     </View>
//   );
// }

const mapStateToProps = state => ({
  masterKey: state.keyReducer.masterKey,
  publicKey: state.keyReducer.publicKey,
  privateKey: state.keyReducer.privateKey,
});

const mapDispatchToProps = dispatch => ({
  addUpdateTimestampAddress: (walletAddress, name, timeStamp) => {
    dispatch({
      type: AddressAction.ADD_UPDATE_ADDRESS,
      address: walletAddress,
      name: name || '',
      timeStamp,
    });
  },
  addTransactionToStore: transaction => {
    dispatch({
      type: TransactionAction.ADD_TRANSACTION,
      transaction,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMoney);
