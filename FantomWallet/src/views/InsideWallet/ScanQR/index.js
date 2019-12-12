import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Colors, fonts, FontSize } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import { DEVICE_WIDTH } from "~/common/constants";
import styles from "./styles";
import FlashIcon from "../../../images/flash.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import QRIcon from "../../../images/QR-01.png";
const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes

export default class ScanQR extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar
          barStyle={
            colorTheme === Colors.royalBlue ||
            colorTheme === "#8959DD" ||
            colorTheme === "#A650A6" ||
            colorTheme === "#4649FD" ||
            colorTheme === "#E32C2C" ||
            colorTheme === "#5F5F7C"
              ? "light-content"
              : "dark-content"
          }
        />
        {/* <View
          style={{
            backgroundColor: colorTheme,
            height: getHeight(500),
            width: DEVICE_WIDTH,
            borderBottomLeftRadius: getHeight(22),
            borderBottomRightRadius: getHeight(22),
            position: "absolute",
            top: 0
          }}
        /> */}
        <SafeAreaView style={styles.safeAreaView}>
          <View
            style={{
              backgroundColor: colorTheme,
              height: getHeight(480),
              width: DEVICE_WIDTH,
              borderBottomLeftRadius: getHeight(22),
              borderBottomRightRadius: getHeight(22),
              position: "absolute",
              top: 0
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity>
                <Entypo name="cross" size={25} color={Colors.white} />
              </TouchableOpacity>
              <Image
                source={FlashIcon}
                style={styles.flashImage}
                resizeMode="contain"
              ></Image>
            </View>
            <View style={styles.middleView}/>
            <View style={styles.imageView}>
              <FontAwesome
                name="image"
                size={20}
                color={Colors.white}
                style={{ marginRight: 10 }}
              ></FontAwesome>
            </View>
            <TouchableOpacity
              style={{
                marginTop: getHeight(90),
                alignItems: "center",
                justifyContent: "center",
                alignSelf:"center",
                marginBottom:getHeight(70)
              }}
            >
              <Image
                source={QRIcon}
                style={styles.qrImage}
                resizeMode="contain"
              ></Image>
              <Text style={styles.myCodeText}>My code</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
