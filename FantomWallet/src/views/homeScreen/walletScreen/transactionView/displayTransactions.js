import React, { Component } from 'react';
import TransactionEntity from './transactionEntity/';


class DisplayTransaction extends Component {
    render() {
        const { fantomTransactionArr, selectedSortMenu, allTransaction, publicKey, isLoading } = this.props;

        let displayTransaction = '';
        
        displayTransaction = isLoading === false && fantomTransactionArr && fantomTransactionArr.length > 0 &&
            fantomTransactionArr.map((transaction, index) => {
                return (
                    (selectedSortMenu === transaction.type || selectedSortMenu === allTransaction) &&
                    <TransactionEntity key={index} transaction={transaction} publicKey={publicKey} />
                )
            });

        return displayTransaction;
    }
}
export default DisplayTransaction;