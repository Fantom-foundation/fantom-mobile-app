import React, { PureComponent } from 'react';
import { View } from 'react-native';
import style from './style';

export default class ProgressBar extends PureComponent {
  render() {
    let { completed, remaining } = this.props;

    completed = Number(completed);
    remaining = Number(remaining);
    return (
      <View style={style.wrapper}>
        <View style={{ flex: completed, backgroundColor: 'rgb(0,177,251)' }} />
        <View style={{ flex: remaining, backgroundColor: 'rgb(255,255,255)' }} />
      </View>
    );
  }
}
