import React, { useState, createRef } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";
import { Colors } from "~/theme";
import { getHeight, getWidth } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Entypo from "react-native-vector-icons/Entypo";
import { DEVICE_WIDTH } from "~/common/constants";
import styles from "./styles";
import FlashIcon from "../../../images/flash.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import QRIcon from "../../../images/QR-01.png";
import ImagePicker from "react-native-image-picker";
import { RNCamera } from "react-native-camera";
import { QRreader } from "react-native-qr-scanner";

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes
let options = {
  title: "Select Image",
  customButtons: [
    { name: "customOptionKey", title: "Choose Photo from Custom Option" }
  ],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
const ScanQR = props => {
  const [torch, setTorch] = useState(false);
  const [barcodeCodes, setbarCodes] = useState([]);
  const [qrImage, setqrImage] = useState("");
  let camera = createRef(null);
  let isBarcodeRead = false;
  const openGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      const routes = props.navigation.getParam("routes");

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        if (response.uri) {
          setqrImage(response.uri);
          QRreader(response.uri)
            .then(data => {
              let copybarCodes = barcodeCodes.slice();
              copybarCodes.push(data);
              setbarCodes(copybarCodes);
              if (routes) {
                props.navigation.navigate(routes, {
                  publicKey: data
                });
              } else {
                NavigationService.pop();
              }
            })
            .catch(err => {
              Alert.alert("Error", "Not a Valid QrCode");
              setqrImage("");
              setbarCodes("");
            });
        }
      }
    });
  };

  const onBarCodeRead = async scanResult => {
    const routes = props.navigation.getParam("routes");
    if (!isBarcodeRead) {
      isBarcodeRead = true;
      let copybarCodes = barcodeCodes.slice();
      if (scanResult.data !== null) {
        if (camera) {
          const options = { quality: 1, base64: true };
          const data = await camera.takePictureAsync(options);
          if (data && data.uri) {
            copybarCodes.push({ scanResult: scanResult.data });

            setbarCodes(copybarCodes);
            setqrImage(data.uri);
            if (routes) {
              props.navigation.navigate(routes, {
                publicKey: scanResult.data
              });
            } else {
              NavigationService.pop();
            }
          }
        }
      }
    }

    return;
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle={colorTheme === Colors.royalBlue} />

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
            <TouchableOpacity onPress={() => NavigationService.pop()}>
              <Entypo name="cross" size={25} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTorch(!torch)}>
              <Image
                source={FlashIcon}
                style={styles.flashImage}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.middleView}>
            {!qrImage && (
              <RNCamera
                flashMode={
                  torch
                    ? RNCamera.Constants.FlashMode.on
                    : RNCamera.Constants.FlashMode.off
                }
                onBarCodeRead={onBarCodeRead}
                type={RNCamera.Constants.Type.back}
                mirrorImage={false}
                ref={cam => (camera = cam)}
                style={styles.cameraStyle}
              ></RNCamera>
            )}
            {!!qrImage && (
              <Image
                style={styles.cameraStyle}
                source={{
                  uri: qrImage
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.imageView} onPress={openGallery}>
            <FontAwesome
              name="image"
              size={20}
              color={Colors.white}
              style={styles.openGallery}
            ></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.qrButton}
            onPress={() =>
              NavigationService.navigate(routes.root.ReceiveMyQcCode)
            }
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
};
export default ScanQR;
