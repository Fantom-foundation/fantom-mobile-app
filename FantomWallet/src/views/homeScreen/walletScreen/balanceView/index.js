import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import style from './style';
/**
 * BalanceView: This component is meant for rendering balance of wallet on wallet screen.
 */
class BalanceView extends PureComponent {
  toFixed(num, fixed) {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    return num.toString().match(re)[0];
  }

  render() {
    const { balance } = this.props;
    const ftmBalance = this.toFixed(balance, 4);
    // const ftmBalance = Number(balance).toFixed(6);
    console.warn(balance, 'maxFantomBalance');

    return (
      <View style={style.fantomBalanceView}>
        <View style={style.balanceContainer}>
          <Text style={style.amountHeadingStyle}>Amount</Text>
        </View>
        <View style={style.balanceViewText}>
          <Text numberOfLines={1} style={style.balanceUnitTextStyle}>
            {ftmBalance} FTM
          </Text>
        </View>
      </View>
    );
  }
}

export default BalanceView;
