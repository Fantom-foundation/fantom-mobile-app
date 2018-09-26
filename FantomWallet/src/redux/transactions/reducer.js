import * as Actions from './action';

function addNewTransaction(state, action) {
  let transactions = [].concat(state.transactions);
  const { transaction } = action;
  transactions.push(transaction);
  return Object.assign({}, state, {
    transactions,
  });
}
const TransactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case Actions.ADD_TRANSACTION:
      return addNewTransaction(state, action);
    default:
      return state;
  }
};

export default TransactionReducer;
