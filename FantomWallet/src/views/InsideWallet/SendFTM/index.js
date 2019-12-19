import React from "react";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  ScrollView
} from "react-native";
import { Colors } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import styles from "./styles";

const keypadText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];

export default class SendFTM extends React.Component<any, any> {
  state = {
    unit: "FTM", //FTM, BNB, ETA
    toId: "", // Use 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2
    memoId: "",
    amountText: "",
    amount: 27.46
  };
  //formating Number
  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  //  function for entered amount from KeyPad
  handleInputNumber = item => {
    const { amountText } = this.state;
    if (item === "<") {
      let num = amountText.slice(0, -1);
      this.setState({ amountText: num });
    } else {
      this.setState({ amountText: amountText.concat(item) });
    }
  };

  render() {
    const { unit, amount, amountText, toId, memoId } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.containerStyle}>
        <StatusBar
          backgroundColor={Colors.white}
          barStyle="dark-content"
          translucent
        />
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.buttonsWrapper}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => NavigationService.pop()}>
                  <Entypo name="cross" size={25} color={Colors.textBlack} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (toId !== "") {
                      NavigationService.navigate(routes.root.ScanQR);
                    }
                  }}
                >
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
                  <Text style={styles.toId}>{toId}</Text>
                </View>
                {toId === "" && (
                  <View style={styles.flexDirectionRow}>
                    <Button
                      activeOpacity={0.5}
                      text="Paste"
                      onPress={() => {}}
                      buttonStyle={styles.buttonStyle}
                      textStyle={styles.textStyle}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        NavigationService.navigate(routes.root.ScanQR)
                      }
                    >
                      <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={25}
                        color={Colors.textBlack}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={styles.horizontalRow} />
              {unit === "BNB" && (
                <>
                  <View style={styles.toWrapper}>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.toText}>Memo:</Text>
                      <Text style={styles.toId}>{memoId}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalRow} />
                </>
              )}
              <View
                style={{
                  marginTop: unit === "BNB" ? getHeight(25) : getHeight(64),
                  ...styles.flexDirectionRow
                }}
              >
                <Text style={styles.amountText}>
                  {amountText ? this.formatNumber(amountText) : 0}
                </Text>
                <Text style={styles.unit}>{unit}</Text>
              </View>
              <Text style={styles.amount}>{`($${amount})`}</Text>
              <FlatList
                data={keypadText}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.flex}
                contentContainerStyle={styles.centerContent}
                numColumns={3}
                bounces={false}
                horizontal={false}
                scrollEnabled
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        ...styles.keypadButtonWrapper,
                        marginHorizontal: index % 3 === 1 ? getWidth(58) : 0
                      }}
                      onPress={() => this.handleInputNumber(item)}
                    >
                      <Text style={styles.keypadItem}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
