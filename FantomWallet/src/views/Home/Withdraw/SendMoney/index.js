// @flow
import React from "react";
import {
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import type { NavigationScreenProp } from "react-navigation";

import { NavigationService, routes } from "~/navigation/helpers";
import Header from "~/components/Header/index";
import Loading from "~/components/general/Loader";
import { DEVICE_WIDTH, GAS_PRICE } from "~/common/constants";
import { addUpdateTimestampAddress } from "~/redux/addressBook/actions";
import { sendTransaction as sendTransactionAction } from "~/redux/wallet/actions";
import { estimationMaxFantomBalance, toFixed } from "~/utils/converts";
import BackgroundIcon from "~/images/BackgroundIcon.png";
import fantomIcon from "~/images/FantomWalletWhiteIcon.png";
import styles from "./styles";

type Props = {
  balance: string,
  isLoading: boolean,
  addUpdateAddress: (string, string, number) => void,
  sendTransaction: ({ to: string, value: string, memo: string }) => void,
  navigation: NavigationScreenProp
};

export const SendMoneyContainer = ({
  balance,
  sendTransaction,
  addUpdateAddress,
  navigation,
  isLoading
}: Props) => {
  const {
    address,
    reload,
    memo,
    amount,
    coin,
    balance: balanceInNav
  } = navigation.state.params;

  const onLeftIconPress = () => NavigationService.pop();
  const alertSuccessfulButtonPressed = isSuccess => {
    addUpdateAddress(address, "", new Date().getTime());
    if (reload) reload();
    NavigationService.navigate(routes.HomeScreen.Wallet);
  };

  const onConfirmHandler = () => {
    const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);
    if (amount === 0 || amount > maxFantomBalance) {
      Alert.alert("Error", "Please enter valid amount.");
    } else {
      sendTransaction({
        to: address,
        value: amount,
        memo,
        cbSuccess: alertSuccessfulButtonPressed
      });
    }
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

  const amt = toFixed(balanceInNav, 4);
  let multilineCheck = false;
  const match = /\r|\n/.exec(memo); // Checks for multi-line in memo text
  if (match) {
    multilineCheck = true;
  }

  return (
    <View style={styles.mainContainerStyle}>
      <Header
        leftButtonIcon="chevron-left"
        leftIconColor="#fff"
        leftIconSize={30}
        fantomIcon={fantomIcon}
        onLeftIconPress={onLeftIconPress}
        textStyle={styles.headerComponentText}
        headerStyle={styles.headerComponent}
      />
      <Image
        style={styles.backgroundIconStyle}
        source={BackgroundIcon}
        resizeMode="contain"
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.topMarginContainer} />
        <View style={styles.amtContainer}>
          <View style={styles.balanceHeadingContainer}>
            <Text style={styles.balanceHeadingTextStyle}>Balance</Text>
          </View>
          <View style={styles.balanceViewText}>
            <Text numberOfLines={1} style={styles.balanceViewTextOne}>
              {`${amt} FTM`}
            </Text>
          </View>
        </View>
        {/* Address to send */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Address to send</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              value={address}
              style={styles.valueTextStyle}
              editable={false}
            />
          </View>
        </View>
        {/* Price container */}
        <View style={styles.addressContainer}>
          <Text style={styles.inputTextHeading}>Amount</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.valueTextStyle}
              value={amount ? amount.toString() : "0"}
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
            style={
              multilineCheck
                ? styles.textInputContainer
                : styles.memoTextInputContainer
            }
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
            onPress={onConfirmHandler}
          >
            <View style={styles.confirmButtonInnerContainer}>
              <FontAwesome5
                name="check"
                color="#FFF"
                size={DEVICE_WIDTH * 0.09}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.confirmTextStyle}>Confirm</Text>
        </View>
        <View style={styles.space} />
      </ScrollView>
      {isLoading && <Loading loaderColor="#fff" />}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.wallet.sendTransactionIsLoading,
  balance: state.wallet.balance
});

const mapDispatchToProps = {
  addUpdateAddress: addUpdateTimestampAddress,
  sendTransaction: sendTransactionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMoneyContainer);
