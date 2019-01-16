import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TransactionEntity from './transactionEntity';
/**
 * DisplayTransaction: This component is meant for displaying all transactions.
 */
class DisplayTransaction extends Component {
  render() {
    const {
      fantomTransactionArr,
      selectedSortMenu,
      allTransaction,
      publicKey,
      isLoading,
    } = this.props;

    let displayTransaction = '';

    displayTransaction =
      isLoading === false &&
      fantomTransactionArr &&
      fantomTransactionArr.length > 0 &&
      fantomTransactionArr.map(
        (transaction, index) =>
          (selectedSortMenu === transaction.type || selectedSortMenu === allTransaction) && (
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
          )
      );

    return displayTransaction;
  }
}

DisplayTransaction.propTypes = {
  fantomTransactionArr: PropTypes.array,
  selectedSortMenu: PropTypes.string,
  allTransaction: PropTypes.string,
  publicKey: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default DisplayTransaction;
