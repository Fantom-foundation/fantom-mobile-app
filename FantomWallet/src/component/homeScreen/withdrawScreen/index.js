import React, {Component} from 'react';
import {View, Text} from 'react-native';

import style from './style';

/**
 * To Display WithdrawTab related tasks
 */
export default class WithdrawScreen extends Component {
    render() {
      return (
        <View style={style.withdrawViewStyle}>
          <Text style={style.textViewStyle}>Withdraw</Text>
        </View>
      );
    }
  }