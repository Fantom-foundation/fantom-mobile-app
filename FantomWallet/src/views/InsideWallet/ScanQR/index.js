import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Colors } from '~/theme';
import { getHeight, getWidth } from '~/utils/pixelResolver';
import { NavigationService, routes } from '~/navigation/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import { DEVICE_WIDTH } from '~/common/constants';
import styles from './styles';
import FlashIcon from '../../../images/flash.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QRIcon from '../../../images/QR-01.png';
import ImagePicker from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes
let options = {
  title: 'Select Image',
  customButtons: [
    { name: 'customOptionKey', title: 'Choose Photo from Custom Option' }
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class ScanQR extends React.Component<any, any> {
  openGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar
          barStyle={
            colorTheme === Colors.royalBlue ||
            colorTheme === '#8959DD' ||
            colorTheme === '#A650A6' ||
            colorTheme === '#4649FD' ||
            colorTheme === '#E32C2C' ||
            colorTheme === '#5F5F7C'
              ? 'light-content'
              : 'dark-content'
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
              position: 'absolute',
              top: 0
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => NavigationService.pop()}>
                <Entypo name="cross" size={25} color={Colors.white} />
              </TouchableOpacity>
              <Image
                source={FlashIcon}
                style={styles.flashImage}
                resizeMode="contain"
              ></Image>
            </View>
            <View style={styles.middleView}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.cameraStyle}
              ></RNCamera>
            </View>
            <TouchableOpacity
              style={styles.imageView}
              onPress={() => this.openGallery()}
            >
              <FontAwesome
                name="image"
                size={20}
                color={Colors.white}
                style={{ marginRight: 10 }}
              ></FontAwesome>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: getHeight(90),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: getHeight(70),
                width: 100,
                height: 100
              }}
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
  }
}
