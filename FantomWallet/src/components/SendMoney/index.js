// @flow
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from '~/components/Header/index';
import Loading from '~/components/general/Loader';
import config from '~/services/config';
import { SUCCESS, SENT, FAILED, DEVICE_HEIGHT, DEVICE_WIDTH, GAS_PRICE } from '~/common/constants';
import { estimationMaxFantomBalance } from '~/utils/converts';
import Web3Agent from '~/services/api/web3';

import styles from './styles';

import * as AddressAction from '~/redux/addressBook/action';
import * as TransactionAction from '~/redux/transactions/action';
import type { TransactionT } from '~/redux/wallet/actions';

import BackgroundIcon from '~/images/BackgroundIcon.png';
import fantomIcon from '~/images/FantomWalletWhiteIcon.png';

type Props = {
  balance: string,
  publicKey: string,
  privateKey: string,
  addTransactionToStore: TransactionT => void,
  addUpdateTimestampAddress: (string, string, number) => void,
  navigation: {
    goBack: () => void,
    state: {
      params: any,
    },
  },
};

type State = {
  isLoading: boolean,
  val: string,
};

class SendMoney extends Component<Props, State> {
  isConfirmationRecieved: boolean = false;

  scrollView: any = null;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      val: 'FTM',
    };
  }

  onLeftIconPress() {
    this.props.navigation.goBack();
  }

  onConfirmHandler() {
    const { balance } = this.props;
    const { address, amount, memo } = this.props.navigation.state.params;
    const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);

    if (amount === 0 || amount > maxFantomBalance) {
      Alert.alert('Error', 'Please enter valid amount.');
    } else {
      this.transferMoney(this.props.publicKey, address, amount, memo);
    }
  }

  async transferMoney(from, to, value, memo) {
    this.setState({ isLoading: true });

    const { privateKey } = this.props;
    const date = moment().format('YYYY-MMM-DD hh:mm:ss a');
    const configHelper = config();

    let endpoin = 'Fantom';
    let transactionStatus = SUCCESS;
    if (configHelper.isEthereumMode) endpoin = 'Ethereum';

    try {
      const responce = await Web3Agent[endpoin].transfer({ from, to, value, memo, privateKey });
      if (!responce.blockHash) throw Error('Invalid error. Please check the data and try again.');
      Alert.alert('Success', `Transfer successful with transaction hash: ${responce.blockHash}`, [
        // { text: 'Copy', onPress: () => { Clipboard.setString(data.hash); } },
        { text: 'Ok', onPress: () => this.alertSuccessfulButtonPressed(), style: 'cancel' },
      ]);
    } catch (e) {
      transactionStatus = FAILED;
      Alert.alert('Error', e.message || 'Invalid error. Please check the data and try again.');
    } finally {
      const transaction: TransactionT = {
        type: SENT,
        amount: value,
        transactionId: '',
        transactionStatus,
        amountUnit: 'FTM',
        from,
        to,
        isError: false,
        date,
      };
      this.props.addTransactionToStore(transaction);
    }

    this.setState({ isLoading: false });
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

  toFixed(num, fixed) {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    return num.toString().match(re)[0];
  }

  renderAmountContainer(maxFantomBalance) {
    const amt = this.toFixed(maxFantomBalance, 4);
    return (
      <View style={styles.amtContainer}>
        <View style={styles.balanceHeadingContainer}>
          <Text style={styles.balanceHeadingTextStyle}>Balance</Text>
        </View>
        <View style={styles.balanceViewText}>
          <Text numberOfLines={1} style={styles.balanceViewTextOne}>
            {amt} {this.state.val}
          </Text>
        </View>
      </View>
    );
  }

  renderAddressContainer(address) {
    return (
      <View style={styles.addressContainer}>
        <Text style={styles.inputTextHeading}>Address to send</Text>
        <View style={styles.textInputContainer}>
          <TextInput value={address} style={styles.valueTextStyle} editable={false} />
        </View>
      </View>
    );
  }

  renderPriceContainer(coin, amount) {
    let amountValue = '0';
    if (amount) {
      amountValue = amount.toString();
    }
    return (
      <View style={styles.addressContainer}>
        <Text style={styles.inputTextHeading}>Amount</Text>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.valueTextStyle} value={amountValue} editable={false} />
          <View style={styles.priceSubContainer}>
            <Text style={styles.priceTextStyle}>{coin}</Text>
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
      <View style={styles.addressContainer}>
        <Text style={styles.inputTextHeading}>Memo</Text>
        <View style={multilineCheck ? styles.textInputContainer : styles.memoTextInputContainer}>
          <TextInput
            style={styles.valueTextStyle}
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
      <View style={styles.attentionMainContainer}>
        <MaterialIcons name="warning" color="rgb(245, 206, 0)" size={24} />
        <Text style={styles.attentionTextStyle}>Attention</Text>
        <Text style={styles.warningTextStyle}>
          Please make sure the above information is correct.
        </Text>
      </View>
    );
  }

  renderConfirmButton() {
    return (
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={styles.confirmButtonOuterContainer}
          onPress={() => this.onConfirmHandler()}
        >
          <View style={styles.confirmButtonInnerContainer}>
            <FontAwesome5 name="check" color="#FFF" size={DEVICE_WIDTH * 0.09} />
          </View>
        </TouchableOpacity>
        <Text style={styles.confirmTextStyle}>Confirm</Text>
      </View>
    );
  }

  render() {
    const { address, coin, amount, memo, balance } = this.props.navigation.state.params;
    return (
      <View style={styles.mainContainerStyle}>
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
        <Image style={styles.backgroundIconStyle} source={BackgroundIcon} resizeMode="contain" />
        <ScrollView
          ref={scroll => {
            this.scrollView = scroll;
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topMarginContainer} />
          {this.renderAmountContainer(balance)}
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
        {this.state.isLoading && <Loading loaderColor="#fff" />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  masterKey: state.keys.masterKey,
  publicKey: state.keys.publicKey,
  privateKey: state.keys.privateKey,
  balance: state.wallet.balance,
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
