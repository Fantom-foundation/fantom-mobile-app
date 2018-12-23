import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// style
import style from './style';
// components
import WalletView from './walletView';
import BackgroundImage from '../../../images/BackgroundIcon.png';

/**
 * To Display WalletTab related tasks
 */
class WalletScreen extends PureComponent {
  render() {
    const { balance, transactionData, isLoading, navigation, onRefresh } = this.props;
    console.log(transactionData, 'WalletScreentransactionData');
    return (
      <View style={style.walletViewStyle}>
        <View style={style.walletScreenStyle}>
          <WalletView
            balance={balance}
            navigation={navigation}
            transactionData={transactionData}
            isLoading={isLoading}
            onRefresh={onRefresh}
          />
          <Image style={style.backgroundImgStyle} source={BackgroundImage} resizeMode="contain" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keyReducer.publicKey,
});

const mapDispatchToProps = () => ({});

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
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transactionData: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletScreen);
