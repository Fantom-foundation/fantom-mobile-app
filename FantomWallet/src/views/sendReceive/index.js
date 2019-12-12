// @flow
// Library
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput
} from "react-native";

//Assets
import QRCode from "../../images/scanQR.png";

// Styling
import styles from "./styles";
import { getWidth } from "../../utils/pixelResolver";
import Button from "../../components/general/Button";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../../theme";

/**
 * SendReceive: This component is meant for performing tasks related to amount of Cash Send OR Receive.
 */
export const SendReceive = ({ navigation }: Props) => {
  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.safeAreaView}>
          {/* Scan Button */}

          <TouchableOpacity style={styles.qrCodeButton}>
            <Image source={QRCode} style={styles.qrImage} />
          </TouchableOpacity>

          {/* Price and Wallet View */}
          <Text style={styles.sendPrice}>0</Text>
          <Text style={styles.sendPriceExample}>($0)</Text>
          <View style={styles.walletButton}>
            <TouchableOpacity>
              <Text style={styles.walletText}>FTM</Text>
            </TouchableOpacity>
            <Text style={styles.walletAmountText}>(43,680)</Text>
          </View>

          {/* KeyPad */}
          <View style={styles.keyPadView}>
            <FlatList
              data={keyPad}
              renderItem={({ item, index }) => {
                let marginLeft = getWidth(58);
                let marginTop = 10;
                if (index === 0 || index === 3 || index === 6 || index === 9)
                  marginLeft = 0;

                if (index === 0 || index === 1 || index === 2) marginTop = 10;
                return (
                  <TouchableOpacity
                    style={[
                      styles.numberButton,
                      { marginLeft: marginLeft, marginTop: marginTop }
                    ]}
                  >
                    <Text style={styles.numberText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
              //Setting the number of column
              numColumns={3}
              keyExtractor={index => index.toString()}
            />
          </View>

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
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      {/* Modal View */}
      <View style={styles.modalView}>
        <View style={styles.crossSendView}>
          <TouchableOpacity>
            <Entypo name="cross" size={25} color={Colors.blackOpacity} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
        {/* To Option */}
        <View style={styles.toView}>
          <Text style={styles.toText}>To:</Text>
          <TextInput multiline={2} style={styles.sendTo}></TextInput>
          {/* Paste Option */}
          <TouchableOpacity style={styles.pasteButton}>
            <Text style={styles.pasteText}>Paste</Text>
          </TouchableOpacity>
          {/* QR Button */}
          <TouchableOpacity style={styles.qrButton}>
            <Image source={QRCode} style={styles.qrSendImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.crossSendView}>
          <Text style={styles.toText}>Memo:</Text>
          <TextInput multiline={2} style={styles.memoTextInput}></TextInput>
        </View>
      </View>
    </View>
  );
};

export default SendReceive;
