/* eslint-disable*/

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import style from './style';

/**
 * To Display ActivityTab related tasks
 */
class ActivityScreen extends PureComponent {
  render() {
    return (
      <View style={style.activityViewStyle}>
        <Text style={style.textViewStyle}>Activity</Text>
      </View>
    );
  }
}
export default ActivityScreen;
