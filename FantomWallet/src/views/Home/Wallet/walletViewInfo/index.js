import React, { Component } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

import BalanceView from '../balanceView';
import TransactionView from '../transactionView';
import { DEVICE_HEIGHT } from '~/common/constants';

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
    const fantomTransactionArr = this.props.transactionData;
    return (
      <View style={style.mainContainerStyle}>
        <ScrollView
          style={style.fantomViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <View style={{ height: 32, backgroundColor: 'rgb(14,14,18)' }} />
          <BalanceView fantomTransactionArr={fantomTransactionArr} balance={this.props.balance} />
          <TransactionView
            fantomTransactionArr={fantomTransactionArr}
            publicKey={this.props.publicKey}
            isLoading={this.props.isLoading}
          />
          <View style={{ height: DEVICE_HEIGHT * 0.3 }} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

// const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps
  // ,  mapDispatchToProps
)(WalletFantomScreen);
