import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  ScrollView,
  TextInput,
  Clipboard,
  Alert
} from "react-native";
import { Colors } from "~/theme";
import KeyPad from "../../../components/general/keyPad";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import styles from "./styles";
import { GAS_PRICE } from "../../../common/constants";
import Web3 from "web3";
import { connect } from "react-redux";
import { addUpdateTimestampAddress } from "../../../redux/addressBook/actions";
import { sendTransaction as sendTransactionAction } from "../../../redux/wallet/actions";
import { estimationMaxFantomBalance, toFixed } from "../../../utils/converts";
import { Loader } from "../../../components/loader";
import Modal from "../../../components/general/modal";

const keypadText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];

const SendFTM = (props: Props) => {
  const [toId, setToId] = useState("");
  const [loader, setLoader] = useState(false);
  const [amountText, setAmountText] = useState("");
  const [buttonModalText, setButtonModalText] = useState("Send");
  const [isSendingModal, setSendingModal] = useState(false);
  const [amount, setAmountInDollar] = useState(27.46);
  const { addUpdateAddress, currentWallet, navigation, isLoading } = props;
  useEffect(() => {
    const setPublicKey = props.navigation.getParam("publicKey");
    if (setPublicKey) {
      setToId(setPublicKey);
    }
  }, [navigation.state.params]);

  const formatNumber = num => {
    if (num && num.indexOf(".") !== -1) {
      return num.replace(",", "");
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const handleInputNumber = item => {
    if (item === "0" && amountText === "") {
      return;
    } else if (item === "." && amountText === "") {
      setAmountText(amountText.concat("0."));
    } else {
      if (item === "<") {
        if (amountText == "0.") setAmountText("");
        else setAmountText(prev => prev.slice(0, -1));
      } else setAmountText(prev => prev.concat(item));
    }
  };
  const alertSuccessfulButtonPressed = () => {
    addUpdateAddress(toId, "", new Date().getTime());
    clearState();
    NavigationService.navigate(routes.HomeScreen.Wallet);
  };

  const clearState = () => {
    setToId("");
    setAmountText("");
    setSendingModal(false);
  };

  const readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setToId(clipboardContent);
  };

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  const handleSendMoney = () => {
    const { sendTransaction } = props;

    if (Number(amountText) === 0) {
      Alert.alert("Error", "Please enter valid amount");
      return;
    } else if (currentWallet.balance < amountText) {
      Alert.alert("Error", "Insufficient balance");
      return;
    } else {
      let message = "";
      if (toId === "") message = "Please enter address.";
      else if (!Web3.utils.isAddress(toId))
        message = "Please enter valid address.";
      else if (amountText === "") message = "Please enter valid amount";

      if (message !== "") {
        Alert.alert("Error", message);
      } else {
        setSendingModal(true);
      }

      // if (toId && Web3.utils.isAddress(toId) && amountText) {
      //   //const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);
      //   // if (amountText === 0 || amountText > maxFantomBalance) {
      //   //   Alert.alert("Error", "Please enter valid amount.");
      //   // } else {
      //   //   sendTransaction({
      //   //     to: toId,
      //   //     value: amountText,
      //   //     memo: "",
      //   //     cbSuccess: alertSuccessfulButtonPressed
      //   //   });
      //   // }
      //   setLoader(false);
      //   console.log("trass", {
      //     to: toId,
      //     value: amountText,
      //     memo: "",
      //     cbSuccess: alertSuccessfulButtonPressed
      //   });
      //   sendTransaction({
      //     to: toId,
      //     value: amountText,
      //     memo: "",
      //     cbSuccess: alertSuccessfulButtonPressed
      //   });
      //   // NavigationService.navigate(routes.root.SendMoney, {
      //   //   address,
      //   //   amount,
      //   //   coin,
      //   //   memo,
      //   //   fees,
      //   //   reload,
      //   //   balance
      //   // });
      // }
    }
  };

  const handleSendAmount = () => {
    const { sendTransaction } = props;
    setLoader(true);
    setButtonModalText("Sending....");
    if (toId && Web3.utils.isAddress(toId) && amountText) {
      //const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);
      // if (amountText === 0 || amountText > maxFantomBalance) {
      //   Alert.alert("Error", "Please enter valid amount.");
      // } else {
      //   sendTransaction({
      //     to: toId,
      //     value: amountText,
      //     memo: "",
      //     cbSuccess: alertSuccessfulButtonPressed
      //   });
      // }

      console.log("trass", {
        to: toId,
        value: amountText,
        memo: "",
        cbSuccess: alertSuccessfulButtonPressed
      });

      sendTransaction({
        to: toId,
        value: amountText,
        memo: "",
        cbSuccess: () => {
          setLoader(false);
          setSendingModal(false);
          setButtonModalText("Send");
          alertSuccessfulButtonPressed();
        }
      });
      // NavigationService.navigate(routes.root.SendMoney, {
      //   address,
      //   amount,
      //   coin,
      //   memo,
      //   fees,
      //   reload,
      //   balance
      // });
    }
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        translucent
      />
      <SafeAreaView style={styles.safeAreaView}>
        {loader && <Loader />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => NavigationService.pop()}>
                <Entypo name="cross" size={25} color={Colors.textBlack} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendMoney}>
                <Text
                  style={{
                    ...styles.sendText,
                    opacity: toId === "" ? 0.5 : 1
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalRow} />

            <View style={styles.toWrapper}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.toText}>To:</Text>
                <TextInput
                  multiline
                  style={styles.toId}
                  value={toId}
                  onChangeText={text => setToId(text)}
                ></TextInput>

                {toId === "" && (
                  <>
                    <Button
                      activeOpacity={0.5}
                      text="Paste"
                      onPress={() => readFromClipboard()}
                      buttonStyle={styles.buttonStyle}
                      textStyle={styles.textStyle}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        NavigationService.navigate(routes.root.ScanQR, {
                          routes: "SendFTM"
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={25}
                        color={Colors.textBlack}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            <View style={styles.horizontalRow} />

            <View style={styles.flexDirectionRow}>
              <Text style={styles.amountText}>
                {amountText ? formatNumber(amountText) : 0}
              </Text>
              <Text style={styles.unit}>FTM</Text>
            </View>

            <Text style={styles.amount}>
              {amountText ? `($${formatNumber(amountText)})` : `($${0})`}
            </Text>

            {/* KeyPad */}

            <KeyPad
              textStyle={styles.keypadItem}
              keyPad={keypadText}
              amountText={amountText}
              handleInputNumber={handleInputNumber}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {isSendingModal && (
        <Modal
          modalText={`Are you sure you want to send ${formatNumber(
            amountText
          )}\n FTM to ${toId}?"`}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.sendButtonView}
          buttons={[
            {
              name: "Cancel",
              onPress: () => setSendingModal(!isSendingModal)
            },
            {
              style: styles.sendButton,
              name: buttonModalText,
              onPress: handleSendAmount,
              disabled: buttonModalText === "Send",
              textStyle: styles.sendTextStyle
            }
          ]}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.wallet.sendTransactionIsLoading,
  currentWallet: state.wallet.currentWallet
});

const mapDispatchToProps = {
  addUpdateAddress: addUpdateTimestampAddress,
  sendTransaction: sendTransactionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFTM);
