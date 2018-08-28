import React, { Component } from 'react';
import TransactionEntity from '../../transactionEntity/index';

class DisplayTransaction extends Component {
    render() {
        const { fantomTransactionArr, selectedSortMenu, ALL_TRANSACTION } = this.props;

        let displayTransaction = '';
        displayTransaction = fantomTransactionArr && fantomTransactionArr.length > 0 &&
         fantomTransactionArr.map((transaction, index) => {
                return (
                    (selectedSortMenu === transaction.type || selectedSortMenu === ALL_TRANSACTION) &&
                    <TransactionEntity key={index} transaction={transaction} />
                )
            });

        return displayTransaction;
    }
}
export default DisplayTransaction;