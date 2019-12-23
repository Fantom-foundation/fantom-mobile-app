import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Switch,
  StatusBar,
  TouchableOpacity,
  FlatList
} from "react-native";
import styles from "./styles";
import { CrossIcon, TickIcon } from "../../../images";
import { Colors } from "../../../theme";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
const currencyData = [
  {
    text: "US Dollar - $",
    id: 0
  },
  {
    text: "Euro - € ",
    id: 1
  },
  {
    text: "British Pound - £",
    id: 2
  },
  {
    text: "Chinese Yuan - CN¥ ",
    id: 3
  },
  {
    text: "Japanese Yen - ¥ ",
    id: 4
  },
  {
    text: "Korean Won - ₩ ",
    id: 5
  },
  {
    text: "Canadian Dollar - CA$",
    id: 6
  },
  {
    text: "Russian Ruble - ₽",
    id: 7
  },
  {
    text: "Swiss Franc - CHf",
    id: 8
  },
  {
    text: "Indian Rupee - ₹",
    id: 9
  }
];
const Currency =(props)=>{
  const [textClicked,setTextClicked]=useState("US Dollar - $")
  const selectItem = (item, index) => {
    setTextClicked(item.text)
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAndroidPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAndroidPress);
  }, []);
  const backAndroidPress = () => {
    BackHandler.exitApp();
    return true;
  };
    const { navigation } = props;
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headingView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={CrossIcon}
                style={styles.crossIcon}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <Text style={styles.headingText}>Currency</Text>
          </View>
          <View style={styles.currencyDataView}>
            <FlatList
              data={currencyData}
              extraData={textClicked}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={styles.rowsTextView}
                      onPress={() => selectItem(item, index)}
                    >
                      <Text
                        style={
                          textClicked === item.text
                            ? styles.selectedRowsText
                            : styles.rowsText
                        }
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                    {textClicked === item.text && (
                      <Image
                        source={TickIcon}
                        style={styles.tickIcon}
                        resizeMode="contain"
                      ></Image>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        </SafeAreaView>
      </View>
    );
}

export default Currency;
