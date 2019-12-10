// @flow
import React from 'react';
import { View } from 'react-native';

import TransactionEntity from './transactionEntity';

type Props = {
  fantomTransactionArr: any;
  selectedSortMenu: Array<string>;
  allTransaction: string;
  publicKey: string;
  isLoading: boolean;
}

/**
 * DisplayTransaction: This component is meant for displaying all transactions.
 */
const DisplayTransaction = ({
  fantomTransactionArr,
  selectedSortMenu,
  allTransaction,
  publicKey,
  isLoading }: Props,
) => isLoading === false &&
fantomTransactionArr &&
fantomTransactionArr.length > 0 &&
  fantomTransactionArr.map(
    (transaction, index) =>
      (selectedSortMenu === transaction.type || selectedSortMenu === allTransaction) && (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index}>
          {/* adding line separator */}
          {index > 0 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.1)',
                marginHorizontal: 5,
              }}
            />
          )}
          {/* Transaction Row */}
          <TransactionEntity transaction={transaction} publicKey={publicKey} />
        </View>
      ),
  );

export default DisplayTransaction;
