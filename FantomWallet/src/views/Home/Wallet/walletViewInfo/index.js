// @flow
import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

import BalanceView from '../BalanceView';
import TransactionView from '../TransactionView';
import { DEVICE_HEIGHT } from '~/common/constants';
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
    <View style={styles.mainContainerStyle}>
      <ScrollView
        style={styles.fantomViewStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />}
      >
        <View style={{ height: 32, backgroundColor: 'rgb(14,14,18)' }} />
        <BalanceView fantomTransactionArr={transactionData} balance={balance} />
        <TransactionView
          fantomTransactionArr={transactionData}
          publicKey={publicKey}
          isLoading={isLoading}
        />
        <View style={{ height: DEVICE_HEIGHT * 0.3 }} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

export default connect(mapStateToProps)(WalletFantomScreen);
