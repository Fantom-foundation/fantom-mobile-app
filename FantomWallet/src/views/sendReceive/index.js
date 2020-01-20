// @flow
// Library
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  Clipboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import Web3 from "web3";
import { connect } from "react-redux";
import { NavigationService, routes } from "~/navigation/helpers";
//Assets
import QRCode from "../../images/scanQR.png";

// Styling
import { GAS_PRICE } from "~/common/constants";
import { addUpdateTimestampAddress } from "~/redux/addressBook/actions";
import {
  sendTransaction as sendTransactionAction,
  sendFtm as sendFtmAction
} from "~/redux/wallet/actions";
import styles from "./styles";
import { getWidth } from "../../utils/pixelResolver";
import Button from "../../components/general/Button";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../../theme";
import KeyPad from "../../components/general/keyPad";
import { balanceToDollar } from "~/utils/converts";
import { Loader } from "../../components/loader";
import Modal from "../../components/general/modal";
import Web3Agent from "../../services/api/web3";
/**
 * SendReceive: This component is meant for performing tasks related to amount of Cash Send OR Receive.
 */
export const SendReceive = (props: TSendReceiveTypes) => {
  const { navigation, addUpdateAddress, currentWallet } = props;
  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [buttonModalText, setButtonModalText] = useState("Send");
  const [address, setSendTo] = useState("");
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSendingModal, setSendingModal] = useState(false);
  const [fontSizeValue, setFontSizeValue] = useState(40);
  const [estimatedfee, setEstimatedfee] = useState(0);
  //const maxFantomBalance = estimationMaxFantomBalance(balance, GAS_PRICE);

  useEffect(() => {
    const gasLimit = 44000;
    Web3Agent.Fantom.estimateFee(gasLimit).then(value => {
      setEstimatedfee(value * 2);
    });
  });

  useEffect(() => {
    if (amount.length <= 5) {
      setFontSizeValue(36);
    } else if (amount.length <= 10) {
      setFontSizeValue(32);
    } else if (amount.length <= 15) {
      setFontSizeValue(28);
    } else {
      setFontSizeValue(20);
    }
  }, [amount]);
  //  function for entered amount from KeyPad
  const handleInputNumber = item => {
    if (item === "0" && amount === "") {
      return;
    } else if (item === "." && amount.includes(".")) {
      return;
    } else if (item === "." && amount === "") {
      let num = amount.concat("0.");
      setAmount(num);
    } else {
      if (item === "<") {
        if (amount === "0.") {
          setAmount("");
        } else {
          let num = amount.slice(0, -1);
          setAmount(num);
        }
      } else {
        setAmount(amount.concat(item));
      }
    }
  };

  useEffect(() => {
    const setPublicKey = props.navigation.getParam("publicKey");
    if (setPublicKey) {
      setSendTo(setPublicKey);
      setOpenModal(true);
    }
  }, [navigation.state.params]);

  const alertSuccessfulButtonPressed = () => {
    const { sendFtm } = props;
    addUpdateAddress(address, "", new Date().getTime());
    sendFtm();
    clearState();
    setLoader(false);
    NavigationService.navigate(routes.HomeScreen.Wallet);
  };

  //formating Number
  const formatNumber = num => {
    if (num && num.indexOf(".") !== -1) {
      return num.replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const handleSendOption = () => {
    // for open Modal for Send Option
    setOpenModal(true);
  };

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to SendMoney screen if all fields are filled.
   */
  const handleSendMoney = () => {
    if (Number(amount) < 0) {
      Alert.alert("Error", "Please enter valid amount");
      return;
    } else if (Number(currentWallet.balance) - Number(estimatedfee) < amount) {
      const maxAmount = Number(currentWallet.balance) - Number(estimatedfee);
      Alert.alert(
        "Insufficient funds",
        `You can transfer max ${maxAmount.toFixed(6)} (Value + gas * price)`
      );
      return;
    } else {
      let message = "";
      if (address === "") message = "Please enter address.";
      else if (!Web3.utils.isAddress(address.trim()))
        message = "Please enter valid address.";
      // else if (amount === "") message = "Please enter valid amount";

      if (message !== "") {
        setLoader(false);
        Alert.alert("Error", message);
      } else {
        setSendingModal(true);
        setLoader(false);
      }
    }
  };

  const handleSendAmount = () => {
    const { sendTransaction } = props;
    setLoader(true);
    setButtonModalText("Sending....");
    if (address && Web3.utils.isAddress(address)) {
      // const maxFantomBalance = estimationMaxFantomBalance(
      //   Number(currentWallet.balance),
      //   GAS_PRICE
      // );
      // if (amount === 0 || amount > maxFantomBalance) {
      //   Alert.alert("Error", "Please enter valid amount.");
      // } else {
      sendTransaction({
        to: address,
        value: amount || "0",
        memo: "",
        cbSuccess: alertSuccessfulButtonPressed
      });
    }
  };

  /**
   * clearState() : reset the fields.
   */
  const clearState = () => {
    setSendTo("");
    setOpenModal(false);
    setSendingModal(false);
    setButtonModalText("Send");
    setAmount("");
  };

  const readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();

    setSendTo(clipboardContent);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        {loader && <Loader />}
        <ScrollView>
          {/* Scan Button */}

          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate(routes.root.ScanQR, {
                routes: "SendReceive"
              })
            }
            style={styles.qrCodeButton}
          >
            <Image source={QRCode} style={styles.qrImage} />
          </TouchableOpacity>

          {/* Price and Wallet View */}
          <Text style={[styles.sendPrice, { fontSize: fontSizeValue }]}>
            {amount ? formatNumber(amount) : 0}
          </Text>
          <Text style={styles.sendPriceExample}>
            (${amount ? balanceToDollar(amount, 5) : 0})
          </Text>

          {/* KeyPad */}

          <KeyPad
            buttonStyle={styles.numberButton}
            textStyle={styles.numberText}
            keyPad={keyPad}
            keyPadStyle={styles.keyPadView}
            handleInputNumber={item => handleInputNumber(item)}
          />

          {/* Buttons */}
          <View style={styles.sendReceiveView}>
            <Button
              text={"Receive"}
              onPress={() =>
                NavigationService.navigate(routes.root.ReceiveMyQcCode, {
                  publicKey: currentWallet.publicKey
                })
              }
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
            <Button
              text={"Send"}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
              onPress={() => handleSendOption()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal View */}
      {openModal && (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.modalView}>
            <View style={styles.crossSendView}>
              <TouchableOpacity
                onPress={() => {
                  setSendTo("");
                  setOpenModal(false);
                }}
              >
                <Entypo name="cross" size={25} color={Colors.blackOpacity} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSendMoney}
                disabled={address ? false : true}
              >
                <Text
                  style={{
                    ...styles.sendText,
                    color: address ? Colors.royalBlue : Colors.lightGrey
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
            {/* To Option */}
            <View style={styles.toView}>
              <Text style={styles.toText}>To:</Text>
              <TextInput
                multiline
                style={styles.sendTo}
                value={address}
                onChangeText={text => setSendTo(text)}
              ></TextInput>
              {/* Paste Option */}
              {!address && (
                <>
                  <TouchableOpacity
                    style={styles.pasteButton}
                    onPress={() => readFromClipboard()}
                  >
                    <Text style={styles.pasteText}>Paste</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate(routes.root.ScanQR, {
                        routes: "SendReceive"
                      })
                    }
                    style={styles.qrButton}
                  >
                    <Image source={QRCode} style={styles.qrSendImage} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {isSendingModal && (
        <Modal
          modalText={`Are you sure you want to send ${formatNumber(
            amount || "0"
          )}\n FTM to ${address}?`}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={
            buttonModalText === "Sending...."
              ? { ...styles.sendButtonView, justifyContent: "center" }
              : styles.sendButtonView
          }
          buttons={[
            {
              name: "Cancel",
              onPress: () => setSendingModal(!isSendingModal),
              isShow: buttonModalText === "Sending...." ? false : true
            },
            {
              style:
                buttonModalText === "Sending...."
                  ? { ...styles.sendButton, backgroundColor: Colors.grey }
                  : styles.sendButton,
              name: buttonModalText,
              onPress: handleSendAmount,
              disabled: buttonModalText !== "Send",
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
  sendTransaction: sendTransactionAction,
  sendFtm: sendFtmAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SendReceive);
