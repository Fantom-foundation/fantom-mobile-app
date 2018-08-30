import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

import BalanceView from '../balanceView/'
import TransactionView from '../transactionView/';

class WalletFantomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh =  () => {
    this.setState({ refreshing: true });
    if (this.props.onRefresh) {
       this.props.onRefresh();
      if (this.props.isLoading === false) {
        this.setState({ refreshing: false })
      }
    }
  }

  render() {
    console.log('this.props.selectedTab : ', this.props.selectedTab);
    const balanceText = '(1,000\\ = 1.00002312FTM)';
    const fantomTransactionArr = this.props.transactionData;
    return (
      <View style={style.mainContainerStyle}>
        <View style={style.amountDisplayStyle}>
          <Text style={style.textViewStyle}>{balanceText} </Text>
        </View>
        <ScrollView
          style={style.fantomViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <BalanceView fantomTransactionArr={fantomTransactionArr} balance={this.props.balance} />
          <TransactionView fantomTransactionArr={fantomTransactionArr} publicKey={this.props.publicKey} isLoading={this.props.isLoading} />
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    publicKey: state.keyReducer.publicKey,
  };
},
  mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(WalletFantomScreen);