import React, { Component } from 'react';
import { View } from 'react-native';
import style from './style';
import WalletView from '../walletScreen/walletView/';
import { connect } from 'react-redux';
const Web3 = require('web3');
import PropTypes from 'prop-types';


/**
 * To Display WalletTab related tasks
 */
class WalletScreen extends Component {

  render() {
    const { balance, transactionData, isLoading, navigation, onRefresh } = this.props;
    return (
      <View style={style.walletViewStyle} >
        <View style={style.walletScreenStyle}>
          <WalletView balance={balance}
            navigation={navigation}
            transactionData={transactionData}
            isLoading={isLoading}
            onRefresh={onRefresh} />
        </View>
      </View>
    );
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

/**
* Custom setting props to be passed for WalletScreen: 
* 
* balance: Wallet balance to be displayed, fetched from Api.
* transactionData: Contains all transactions done by user, fetched from Api.
* isLoading: Contains bool value for rendering  loader on screen , for the time transaction data is being fetched from Api.
* navigation: Contains navigation information within the app.
* onRefresh: Callback function to refresh transaction data from Api.
* 
*/

WalletScreen.propTypes = {
  balance: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  transactionData: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
