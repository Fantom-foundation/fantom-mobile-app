import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './style';

import BalanceView from '../balanceView';
import TransactionView from '../transactionView';

class WalletFantomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  /**
   * _onRefresh()  : This function is meant for refreshing of data from Api, to update transaction list.
   */
  onRefresh() {
    this.setState({ refreshing: true });
    if (this.props.onRefresh) {
      this.props.onRefresh();
      if (this.props.isLoading === false) {
        this.setState({ refreshing: false });
      }
    }
  }

  render() {
    const balanceText = '(1,000\\ = 1.00002312FTM)';
    const fantomTransactionArr = this.props.transactionData;
    return (
      <View style={style.mainContainerStyle}>
        <View style={style.amountDisplayStyle}>
          <Text style={style.textViewStyle}>{balanceText} </Text>
        </View>
        <View style={style.refreshMessageViewStyle}>
          <Text style={style.refreshTextStyle}>Scroll down to refresh</Text>
          <MaterialIcons name="refresh" size={12} style={style.refreshIconStyle} />
        </View>
        <ScrollView
          style={style.fantomViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <BalanceView fantomTransactionArr={fantomTransactionArr} balance={this.props.balance} />
          <TransactionView
            fantomTransactionArr={fantomTransactionArr}
            publicKey={this.props.publicKey}
            isLoading={this.props.isLoading}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keyReducer.publicKey,
});

// const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps
  // ,  mapDispatchToProps
)(WalletFantomScreen);
