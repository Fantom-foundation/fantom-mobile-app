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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { routes } from '~/navigation';
import Header from '~/components/Header/index';
import Loading from '~/components/general/Loader';
import { DEVICE_HEIGHT, DEVICE_WIDTH, GAS_PRICE } from '~/common/constants';
import { addUpdateTimestampAddress } from '~/redux/addressBook/actions';
import { sendTransaction as sendTransactionAction } from '~/redux/wallet/actions';
import { estimationMaxFantomBalance, toFixed } from '~/utils/converts';
import BackgroundIcon from '~/images/BackgroundIcon.png';
import fantomIcon from '~/images/FantomWalletWhiteIcon.png';
import styles from './styles';

type Props = {
  balance: string,
  isLoading: boolean,
  addUpdateAddress: (string, string, number) => void,
  sendTransaction: ({ to: string, value: string, memo: string }) => void,
  navigation: {
    goBack: () => void,
    navigate: string => void,
    state: {
      params: any,
    },
  },
};

type State = {
  val: string,
};

export class SendMoney extends Component<Props, State> {
  isConfirmationRecieved: boolean = false;

  scrollView: any = null;

  state = {
    val: 'FTM',
  };

  onLeftIconPress = () => {
    this.props.navigation.goBack();
  };

  onConfirmHandler() {
    const { balance, sendTransaction } = this.props;
    const { address, amount, memo } = this.props.navigation.state.params;
    const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);

    if (amount === 0 || amount > maxFantomBalance) {
      Alert.alert('Error', 'Please enter valid amount.');
    } else {
      sendTransaction({
        to: address,
        value: amount,
        memo,
        cbSuccess: this.alertSuccessfulButtonPressed,
      });
    }
  }

  alertSuccessfulButtonPressed = () => {
    const { address, reload } = this.props.navigation.state.params;
    const currentDate = new Date();
    this.props.addUpdateAddress(address, '', currentDate.getTime());

    if (reload) reload();
    this.props.navigation.navigate(routes.HomeScreen.Wallet);
  };

  // renderPriceContainer(coin, amount) {
  //   let amountValue = '0';
  //   if (amount) {
  //     amountValue = amount.toString();
  //   }
  //   return (
  //     <View style={styles.addressContainer}>
  //       <Text style={styles.inputTextHeading}>Amount</Text>
  //       <View style={styles.textInputContainer}>
  //         <TextInput style={styles.valueTextStyle} value={amountValue} editable={false} />
  //         <View style={styles.priceSubContainer}>
  //           <Text style={styles.priceTextStyle}>{coin}</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    const { isLoading } = this.props;
    const { address, coin, amount, memo, balance } = this.props.navigation.state.params;

    const amt = toFixed(balance, 4);
    let multilineCheck = false;
    let match = /\r|\n/.exec(memo); // Checks for multi-line in memo text
    if (match) {
      multilineCheck = true;
    }

    return (
      <View style={styles.mainContainerStyle}>
        <StatusBar barStyle="light-content" />
        <Header
          leftButtonIcon="chevron-left"
          leftIconColor="#fff"
          leftIconSize={30}
          fantomIcon={fantomIcon}
          onLeftIconPress={this.onLeftIconPress}
          textStyle={styles.headerComponentText}
          headerStyle={styles.headerComponent}
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
          {/* Address to send */}
          <View style={styles.addressContainer}>
            <Text style={styles.inputTextHeading}>Address to send</Text>
            <View style={styles.textInputContainer}>
              <TextInput value={address} style={styles.valueTextStyle} editable={false} />
            </View>
          </View>
          {/* Price container */}
          <View style={styles.addressContainer}>
            <Text style={styles.inputTextHeading}>Amount</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.valueTextStyle}
                value={amount ? amount.toString() : '0'}
                editable={false}
              />
              <View style={styles.priceSubContainer}>
                <Text style={styles.priceTextStyle}>{coin}</Text>
              </View>
            </View>
          </View>
          {/* Memo container */}
          <View style={styles.addressContainer}>
            <Text style={styles.inputTextHeading}>Memo</Text>
            <View
              style={multilineCheck ? styles.textInputContainer : styles.memoTextInputContainer}
            >
              <TextInput
                style={styles.valueTextStyle}
                value={memo}
                multiline={multilineCheck}
                editable={false}
              />
            </View>
          </View>
          {/* Attention Container */}
          <View style={styles.attentionMainContainer}>
            <MaterialIcons name="warning" color="rgb(245, 206, 0)" size={24} />
            <Text style={styles.attentionTextStyle}>Attention</Text>
            <Text style={styles.warningTextStyle}>
              Please make sure the above information is correct.
            </Text>
          </View>
          {/* Confirm container */}
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
          <View style={{ height: DEVICE_HEIGHT * 0.1 }} />
        </ScrollView>
        {isLoading && <Loading loaderColor="#fff" />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.wallet.sendTransactionIsLoading,
  balance: state.wallet.balance,
});

const mapDispatchToProps = {
  addUpdateAddress: addUpdateTimestampAddress,
  sendTransaction: sendTransactionAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMoney);
