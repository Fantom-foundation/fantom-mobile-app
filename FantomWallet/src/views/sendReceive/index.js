// @flow
// Library
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  Clipboard
} from "react-native";

//Assets
import QRCode from "../../images/scanQR.png";

// Styling
import styles from "./styles";
import { getWidth } from "../../utils/pixelResolver";
import Button from "../../components/general/Button";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../../theme";
import KeyPad from "../../components/general/keyPad";

/**
 * SendReceive: This component is meant for performing tasks related to amount of Cash Send OR Receive.
 */
export const SendReceive = ({ navigation }: Props) => {
  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [number, setNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [sendTo, setSendTo] = useState("");

  //  function for entered number from KeyPad
  const handleInputNumber = item => {
    if (item === "<") {
      let num = number.slice(0, -1);
      setNumber(num);
    } else {
      setNumber(number.concat(item));
    }
  };

  //formating Number
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleSendOption = () => {
    // for open Modal for Send Option
    setOpenModal(true);
  };

  const readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();

    setSendTo(clipboardContent);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.safeAreaView}>
          {/* Scan Button */}

          <TouchableOpacity style={styles.qrCodeButton}>
            <Image source={QRCode} style={styles.qrImage} />
          </TouchableOpacity>

          {/* Price and Wallet View */}
          <Text style={styles.sendPrice}>
            {number ? formatNumber(number) : 0}
          </Text>
          <Text style={styles.sendPriceExample}>($0)</Text>
          <View style={styles.walletButton}>
            <TouchableOpacity>
              <Text style={styles.walletText}>FTM</Text>
            </TouchableOpacity>
            <Text style={styles.walletAmountText}>(43,680)</Text>
          </View>

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
        </SafeAreaView>
      </ScrollView>
      {/* Modal View */}
      {openModal && (
        <View style={styles.modalView}>
          <View style={styles.crossSendView}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Entypo name="cross" size={25} color={Colors.blackOpacity} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
          {/* To Option */}
          <View style={styles.toView}>
            <Text style={styles.toText}>To:</Text>
            <TextInput
              multiline
              style={styles.sendTo}
              value={sendTo}
              onChangeText={text => setSendTo(text)}
            ></TextInput>
            {/* Paste Option */}
            <TouchableOpacity
              style={styles.pasteButton}
              onPress={() => readFromClipboard()}
            >
              <Text style={styles.pasteText}>Paste</Text>
            </TouchableOpacity>
            {/* QR Button */}
            <TouchableOpacity style={styles.qrButton}>
              <Image source={QRCode} style={styles.qrSendImage} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SendReceive;
