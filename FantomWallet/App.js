/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import './global';

import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router';
import factory from './src/redux/store';

const Bip39 = require('bip39');
const Hdkey = require('hdkey');
const EthUtils = require('ethereumjs-util');

const { store, persistor } = factory();

// console.log('bip39');
// console.log(bip39);
// console.log(bip39.generateMnemonic());

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

// const Web3 = require('web3');
// import Web3 from './src/component/sendMoney/web3.min.js'
const hdkey = require('ethereumjs-wallet/hdkey');

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
