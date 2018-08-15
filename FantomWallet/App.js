/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import Router from './router';
import store from './src/redux/store';
import './global';
var bip39 = require('bip39')

// console.log('bip39');
// console.log(bip39);
// console.log(bip39.generateMnemonic());

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Web3 = require('web3');
var hdkey = require('ethereumjs-wallet/hdkey')


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
