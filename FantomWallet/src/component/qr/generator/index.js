'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';


import {
    StyleSheet,
    View,
    TextInput, TouchableOpacity, Text
} from 'react-native';

export default class QRGenerator extends Component {
  state = {
    title: "Fantom Wallet",
    message: "Hola mundo",
    text: JSON.stringify({e: '0x87890989812345678789098981234567', a: 5000}),
  };

  onPress() {
    this.refs.viewShot.capture().then(uri => {
        console.log("do something with ", uri);
        Share.open({url: uri})
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
      });
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
          value={this.state.text}
          size={200}
          fgColor='white'/>
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
