import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

import BalanceView from '../balanceView/'
import TransactionView from '../transactionView/';

import { SUCCESS, FAILED, SENT, RECEIVED, POINT, FANTOM } from '../../../../common/constants/';

class WalletFantomScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fantomTransactionArr: [
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
                { type: RECEIVED, amount: '13.0000000', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: RECEIVED, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: FAILED },
                { type: SENT, amount: '00.00001230', amountUnit: 'FTM', transactionId: '23JGDGD...D872', transactionStatus: SUCCESS },
            ],
        }
      //  this.state.fantomTransactionArr = this.getTransactionsFromApiAsync(this.getPublicKey());
        if (this.props.publicKey) {
          this.getTransactionsFromApiAsync(this.props.publicKey);
        }
    }
    getTransactionsFromApiAsync(address) {
      const dummyAddress = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
      fetch('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('response', responseJson);
          if (responseJson && responseJson.result && responseJson.result.length) {
            // this.setState({

            // })
          }
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getPublicKey() {
      const pubKey = AsyncStorage.getItem('publicKey');
      console.log('getPublicKey');
      console.log(pubKey);
      return pubKey;
    }
    render() {
      console.log('this.props.selectedTab : ', this.props.selectedTab);

        const balanceText = '(1,000\\ = 1.00002312FTM)';
        const fantomTransactionArr = this.state.fantomTransactionArr;
        return (
            <View style={style.mainContainerStyle}>
                <View style={style.amountDisplayStyle}>
                    <Text style={style.textViewStyle}>{balanceText} </Text>
                </View>
                <ScrollView style={style.fantomViewStyle} showsVerticalScrollIndicator={false}>
                    <BalanceView fantomTransactionArr={fantomTransactionArr} />
                    <TransactionView fantomTransactionArr={fantomTransactionArr} />
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