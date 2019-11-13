// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { toFixed } from '~/utils/converts';
import styles from './styles';

type Props = {
  balance: string,
};

/**
 * BalanceView: This component is meant for rendering balance of wallet on wallet screen.
 */
export const BalanceViewContainer = ({ balance }: Props) => {
  const ftmBalance = toFixed(balance, 4);

  return (
    <View style={styles.fantomBalanceView}>
      <View style={styles.balanceContainer}>
        <Text style={styles.amountHeadingStyle}>Amount</Text>
      </View>
      <View style={styles.balanceViewText}>
        <Text numberOfLines={1} style={styles.balanceUnitTextStyle}>
          {ftmBalance} FTM
        </Text>
      </View>
    </View>
  );
};

export default BalanceViewContainer;
