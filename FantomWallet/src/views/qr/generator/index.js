import React, { Component } from 'react';
import { QRCode } from 'react-native-custom-qr-codes';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import uploadQR from '../../../images/uploading.png';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  addressTitleTextStyle: {
    fontWeight: 'bold',
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
      console.log('do something with ', uri);
      const message = '';
      Share.open({ url: uri, title: 'Fantom', message })
        .then(res => {
          console.log('this.props.qrLink , res', this.props.qrLink, res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  renderLogo() {
    if (this.props.qrLink !== undefined && this.props.qrLink !== '') {
      const size = 250;
      const logoWidth = 146;
      const logoHeight = 35;
      return (
        <View
          style={{
            flexDirection: 'row',
            width: logoWidth,
            height: logoHeight,
            position: 'absolute',
            backgroundColor: 'white',
            left: size / 2 - logoWidth / 2,
            top: size / 2 - logoHeight / 2,
          }}
        >
          <Image
            source={require('../../../images/fantom_logo_Black.jpg')} // eslint-disable-line
            style={{ alignSelf: 'center', backgroundColor: 'white', flex: 1, height: logoHeight }}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { billingAmount } = this.props;
    const updatedBillingAmount = Math.round(billingAmount * 10000) / 10000
    return (
      <View style={style.container}>
        <View style={style.addressTitleViewStyle}>
          <Text style={style.addressTitleTextStyle}> {this.props.titleText} </Text>
          <TouchableOpacity style={style.addressShareIconStyle} onPress={() => this.onPress()}>
            <Image
              source={uploadQR}
              style={style.addressShareImageIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* <ViewShot
          ref={viewShot => {
            this.viewShot = viewShot;
          }}
          options={{ format: 'jpg' }}
        > */}
        <View>
          {this.props.qrLink !== undefined &&
            this.props.qrLink !== '' && <QRCode content={this.props.qrLink} codeStyle="dot" />}
          {this.renderLogo()}
          {(this.props.qrLink === undefined || this.props.qrLink === '') && (
            <View style={style.loaderStyle}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </View>
       {/* </ViewShot> */}

<ViewShot
          ref={viewShot => {
            this.viewShot = viewShot;
          }}
          options={{ format: 'jpg' }}
          style={{ position: 'absolute', left: -(DEVICE_WIDTH * 5), top: -(DEVICE_HEIGHT * 5), backgroundColor: 'white' }}
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
          <Text style={{ margin: 10 , marginTop: 0, fontSize: 16, fontWeight: 'bold', width: 230}}>Billing amount: {updatedBillingAmount} FTM</Text>
       </ViewShot>

      </View>
    );
  }
}
