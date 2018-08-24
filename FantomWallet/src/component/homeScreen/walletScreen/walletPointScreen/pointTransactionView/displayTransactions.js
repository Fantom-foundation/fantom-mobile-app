import React, { Component } from 'react';
import TransactionEntity from '../../../../../general/transactionEntity/';

class DisplayTransaction extends Component {
    render() {
        const { pointTransactionArr, selectedSortMenu, ALL_TRANSACTION } = this.props;

        let displayTransaction = '';
        displayTransaction = pointTransactionArr.length > 0 &&
            pointTransactionArr.map((transaction, index) => {
                return (
                    (selectedSortMenu === transaction.type || selectedSortMenu === ALL_TRANSACTION) &&
                        <TransactionEntity key={index} transaction={transaction} />
                )
            });
        return displayTransaction;
    }
}
export default DisplayTransaction;