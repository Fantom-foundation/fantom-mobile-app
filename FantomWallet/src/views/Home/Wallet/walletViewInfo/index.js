// @flow
import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import styles from './styles';

import BalanceView from '../BalanceView';
import TransactionView from '../TransactionView';
import type { TransactionT } from '~/redux/wallet/actions';

type Props = {
  balance: string,
  publicKey: string,
  isLoading: boolean,
  onRefresh: () => void,
  transactionData: Array<TransactionT>,
};

export const WalletFantomScreen = ({
  balance,
  publicKey,
  isLoading,
  onRefresh,
  transactionData,
}: Props) => {
  const [refreshing, setRefresh] = useState(false);

  /**
   * _onRefresh()  : This function is meant for refreshing of data from Api, to update transaction list.
   */
  const _onRefresh = () => {
    setRefresh(true);
    if (onRefresh) {
      onRefresh();
      if (isLoading === false) setRefresh(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
      >
        <View style={{ height: 32 }} />
        <BalanceView fantomTransactionArr={transactionData} balance={balance} />
        <TransactionView
          fantomTransactionArr={transactionData}
          publicKey={publicKey}
          isLoading={isLoading}
        />
      </ScrollView>
    </View>
  );
};
export default WalletFantomScreen;
