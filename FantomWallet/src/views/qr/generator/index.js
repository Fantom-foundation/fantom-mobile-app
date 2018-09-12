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
} from 'react-native';
import uploadQR from '../../../images/uploading.png';

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
    if (billingAmount === '' || billingAmount === 0 || billingAmount === '0') {
      Alert.alert('Error', 'Please enter billing amount.');
      return;
    }
    this.viewShot.capture().then(uri => {
      console.log('do something with ', uri);
      const message = `Billing amount: ${billingAmount}`;
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
            left: size / 2 - logoWidth / 2,
            top: size / 2 - logoHeight / 2,
          }}
        >
          <Image
            resizeMode="contain"
            source={require('../../../images/fantom-logo-small.png')} // eslint-disable-line
            style={{ backgroundColor: 'white', height: logoHeight }}
          />
          <Text
            style={{
              padding: 5,
              alignSelf: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: '900',
              backgroundColor: 'white',
            }}
          >
            FANTOM
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={style.container}>
        {/* <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        /> */}

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

        <ViewShot
          ref={viewShot => {
            this.viewShot = viewShot;
          }}
          options={{ format: 'jpg' }}
        >
          {this.props.qrLink !== undefined &&
            this.props.qrLink !== '' && <QRCode content={this.props.qrLink} codeStyle="dot" />}
          {this.renderLogo()}
          {(this.props.qrLink === undefined || this.props.qrLink === '') && (
            <View style={style.loaderStyle}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </ViewShot>
        {/* <TouchableOpacity onPress={() => this.onPress()}><Text>Share</Text></TouchableOpacity> */}
      </View>
    );
  }
}
