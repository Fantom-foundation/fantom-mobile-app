import '../../../global';
import React, { Component } from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../general/header/index';
import style from './style';
import Button from '../../general/button/index';
import TextField from './TextField';
import Loading from '../../general/loader/index';
import * as AddressAction from '../../redux/addressBook/action';
import * as TransactionAction from '../../redux/transactions/action';
import transferMoney from './transfer';
import { SUCCESS, RECEIVED, SENT, FAILED } from '../../common/constants';

const deviceWidth = Dimensions.get('window').width;

class SendMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.isConfirmationRecieved = false;
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

  alertSuccessfulButtonPressed() {
    const { address, reload } = this.props.navigation.state.params;
    const currentDate = new Date();
    this.props.addUpdateTimestampAddress(address, '', currentDate.getTime());

    if (reload) {
      reload();
    }
    this.props.navigation.goBack();
  }

  transferMoney(from, to, value, memo) {
    this.setState({ isLoading: true });
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

  render() {
    const { address, coin, amount, memo } = this.props.navigation.state.params;
    return (
      <View style={style.mainContainerStyle}>
        <Header text="Check Send" />
        <View style={style.mid}>
          <View style={[style.textFieldStyle, { marginTop: 40 }]}>
            <TextField
              // isimagePresent={true}
              // imgUrl={require('../../images/fantom-logo-dark.png')}
              // imgStyle={{ width: deviceWidth * 0.2 }}
              textinputStyle={{ width: deviceWidth * 0.55 }}
              isTextPresent
              rightTextValue={coin}
              placeHolderText="Coin"
            />
          </View>
          <View style={style.textFieldStyle}>
            <TextField placeHolderText="Address" isTextPresent rightTextValue={address} />
          </View>
          <View style={style.textFieldStyle}>
            <TextField placeHolderText="Price" isTextPresent rightTextValue={amount} />
          </View>
          {/* <View style={style.textFieldStyle}>
            <TextField
              placeHolderText={'Fees'}
              isTextPresent={true}
              rightTextValue={fees}
            />
          </View> */}
          <View style={style.textFieldStyle}>
            <TextField
              placeHolderText="Memo"
              textinputStyle={{ width: deviceWidth * 0.65 }}
              isTextPresent
              rightTextValue={memo}
            />
          </View>
          <Text style={style.additionalInfoTextStyle}>
            Please check if the above information is correct.
          </Text>
          <View style={{ height: 40 }} />
        </View>
        <View style={style.buttonViewStyle}>
          <Button
            text="Cancel"
            buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#000' }}
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            text="Confirm"
            buttonStyle={{ width: deviceWidth * 0.5, backgroundColor: '#ECB414' }}
            onPress={() => this.onConfirmHandler()}
          />
        </View>
        {this.state.isLoading && <Loading />}
      </View>
    );
  }
}

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
