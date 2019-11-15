// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import type { TransactionT } from '~/redux/wallet/actions';
import styles from './styles';
import WalletViewInfo from '../WalletViewInfo';

type Props = {
  balance: string,
  transactionData: Array<TransactionT>,
  isLoading: boolean,
  navigation: any,
  onRefresh: () => void,
}

export const WalletNavigationBar = ({
  balance,
  transactionData,
  isLoading,
  navigation,
  onRefresh,
}: Props) => (
    <View style={styles.mainContainerStyle}>
      <View style={styles.tabInfoStyle}>
        <WalletViewInfo
          navigation={navigation}
          transactionData={transactionData}
          balance={balance}
          isLoading={isLoading}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

export default connect(mapStateToProps)(WalletNavigationBar);
