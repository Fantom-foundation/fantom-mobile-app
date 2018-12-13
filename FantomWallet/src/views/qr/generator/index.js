import React, { Component } from 'react';
import { QRCode } from 'react-native-custom-qr-codes';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {
  StyleSheet,
  View,
  Image,
  // TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import FantomLogoTranparentWhite from '../../../images/fantom_logo_TranparentWhite.png';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },

  addressTitleViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: DEVICE_WIDTH - 32,
    borderRadius: 4,
    marginBottom: 24,

    backgroundColor: 'rgb(44,52,58)',
  },
  addressTitleTextStyle: {
    color: '#FFF',
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 16,
  },
  addressShareIconStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addressShareImageIconStyle: {
    width: 45,
    height: 45,
  },
  loaderStyle: {
    height: 350,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default class QRGenerator extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { billingAmount } = this.props;

    if (
      billingAmount === undefined ||
      billingAmount === '' ||
      billingAmount === 0 ||
      billingAmount === '0'
    ) {
      Alert.alert('Error', 'Please enter billing amount.');
      return;
    }
    // const updatedBillingAmount = Math.round(billingAmount * 10000) / 10000
    this.viewShot.capture().then(uri => {
      const message = '';
      Share.open({ url: uri, title: 'Fantom', message })
        .then(res => {
          // console.log('this.props.qrLink , res', this.props.qrLink, res);
        })
        .catch(err => {
          // console.log(err);
        });
    });
  }

  renderLogo() {
    if (
      this.props &&
      this.props.qrLink &&
      this.props.qrLink !== undefined &&
      this.props.qrLink !== '' &&
      this.props.qrLink !== null
    ) {
      const size = 250;
      const logoWidth = 146;
      const logoHeight = 35;
      const logoConatinerStyle = {
        flexDirection: 'row',
        width: logoWidth,
        height: logoHeight,
        position: 'absolute',
        left: size / 2 - logoWidth / 2,
        top: size / 2 - logoHeight / 2,
        padding: 15,
        backgroundColor: 'rgb(14,14,18)',
      };
      let logoImgStyle = {
        alignSelf: 'center',
        backgroundColor: 'rgb(14,14,18)',
        flex: 1,
        height: logoHeight,
      };
      return (
        <View style={logoConatinerStyle}>
          <Image
            source={FantomLogoTranparentWhite} // eslint-disable-line
            style={logoImgStyle}
            resizeMode="contain"
          />
        </View>
      );
    }
    return null;
  }

  renderLoader() {
    return (
      <View style={style.loaderStyle}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  renderQrCode() {
    if (
      this.props &&
      this.props.qrLink &&
      this.props.qrLink !== undefined &&
      this.props.qrLink !== '' &&
      this.props.qrLink !== null
    ) {
      return (
        <QRCode
          content={this.props.qrLink}
          codeStyle="dot"
          color="#FFF"
          backgroundColor="rgb(14,14,18)"
        />
      );
    }
    // If link is not present, start loader
    return this.renderLoader();
  }

  render() {
    const { billingAmount } = this.props;
    const updatedBillingAmount = Math.round(billingAmount * 10000) / 10000;
    return (
      <View style={style.container}>
        {/* Top heading */}
        <View style={style.addressTitleViewStyle}>
          <Text style={style.addressTitleTextStyle}> {this.props.titleText} </Text>
        </View>

        <View style={{ flex: 1 }}>
          {this.renderQrCode()}

          {/* Displays fantom log in center of QR code */}
          {this.renderLogo()}
        </View>

        {/* For sharing */}
        <ViewShot
          ref={viewShot => {
            this.viewShot = viewShot;
          }}
          options={{ format: 'jpg' }}
          style={{
            position: 'absolute',
            left: -(DEVICE_WIDTH * 5),
            top: -(DEVICE_HEIGHT * 5),
            backgroundColor: 'white',
          }}
        >
          {this.props.qrLink !== undefined &&
            this.props.qrLink !== '' && <QRCode content={this.props.qrLink} codeStyle="dot" />}
          {this.renderLogo()}
          {(this.props.qrLink === undefined || this.props.qrLink === '') && (
            <View style={style.loaderStyle}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
          <View style={{ height: 2, backgroundColor: 'rgb(50, 50, 50)', flex: 1, margin: 10 }} />
          <Text style={{ margin: 10, marginTop: 0, fontSize: 16, fontWeight: 'bold', width: 230 }}>
            Billing amount: {updatedBillingAmount} FTM
          </Text>
        </ViewShot>
      </View>
    );
  }
}
