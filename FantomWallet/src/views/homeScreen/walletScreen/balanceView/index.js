import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import style from './style';
/**
 * BalanceView: This component is meant for rendering balance of wallet on wallet screen.
 */
class BalanceView extends PureComponent {
  render() {
    const { balance } = this.props;
    const ftmBalance = Number(balance).toFixed(4);

    // const balanceTextFour = '122,000\\';

    return (
      <View style={style.fantomBalanceView}>
        <View style={style.balanceContainer}>
          <View style={style.balanceViewText}>
            <Text numberOfLines={1} style={style.balanceViewTextOne}>
              {ftmBalance} FTM
            </Text>
            {/* <Text style={style.balanceUnitText}>{balanceTextThree}</Text> */}
          </View>
          {/* <View style={style.balanceTextTwo}>
            <Text style={style.balanceTextStyle}> {balanceTextFour} </Text>
          </View> */}
        </View>
      </View>
    );
  }
}

export default BalanceView;
