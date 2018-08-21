'use strict';

import React, { Component } from 'react';
import { QRCode } from 'react-native-custom-qr-codes';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import VersionCheck from 'react-native-version-check';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity, Text
} from 'react-native';


export default class QRGenerator extends Component {
  
  
  state = {
    title: "Fantom Wallet",
    message: "Hola mundo",
    text: '0x87890989812345678789098981234567',
  };

  onPress() {
    this.refs.viewShot.capture().then(uri => {
      console.log("do something with ", uri);
      Share.open({ url: uri })
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
    });

    console.warn(VersionCheck.getPackageName());        // com.reactnative.app
    console.warn(VersionCheck.getCurrentBuildNumber()); // 10
    console.warn(VersionCheck.getCurrentVersion());     // 0.1.1

    VersionCheck.getLatestVersion()
      .then(latestVersion => {
        console.log(latestVersion, 'latest');    // 0.1.2
      });
  }

  renderLogo() {
    const size = 250;
    const logoWidth = 146;
    const logoHeight = 35;
    return (
      <View style={{ flexDirection: 'row', width: logoWidth, height: logoHeight, position: 'absolute', left: ((size / 2) - (logoWidth / 2)), top: ((size / 2) - (logoHeight / 2)) }}>
        <Image resizeMode='contain' source={require('../../../images/fantom-logo-small.png')} style={{ backgroundColor: 'white', height: logoHeight }} />
        <Text style={{ padding: 5, alignSelf: 'center', justifyContent: 'center', fontSize: 24, fontWeight: '900', backgroundColor: 'white' }}>FANTOM</Text>
      </View>
    )
  }
 

  render() {
  
    return (
      <View style={styles.container}>
        {/* <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        /> */}
        <ViewShot ref="viewShot" options={{ format: "jpg" }}>
          <QRCode
            content={this.state.text}
            codeStyle='dot'
            ecl='H'
          />
          {this.renderLogo()}
        </ViewShot>
        <TouchableOpacity onPress={() => this.onPress()}><Text>Share</Text></TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  }
});
