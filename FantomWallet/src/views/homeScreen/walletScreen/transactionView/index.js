// Library
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// style
import style from './style';
// components
import EmptyTransactionEntity from './transactionEntity/emptyTransactionEntity';
import SortMenuCard from '../../../../general/sortMenuCard';
import DisplayTransaction from './displayTransactions';
import Loader from '../../../../general/loader';
// import sortMenuIcon from '../../../../images/arrow_With_bar.png';

import {
  SENT,
  RECEIVED,
  ALL_TRANSACTION,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../../common/constants';

/**
 * TransactionView: This component is meant for rendering transactions done on particuler wallet.
 */
class TransactionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSortMenu: false,
      data: [
        { key: 'All Payments', id: 0, sc: ALL_TRANSACTION },
        { key: 'Received Payments', id: 1, sc: RECEIVED },
        { key: 'Sent Payments', id: 2, sc: SENT },
      ],
      index: 0,
      val: ALL_TRANSACTION,
    };
  }

  toggleSortMenu() {
    const { openSortMenu } = this.state;
    this.setState({
      openSortMenu: !openSortMenu,
    });
  }

  handleSortMenu(item) {
    const { openSortMenu } = this.state;
    this.setState({
      openSortMenu: !openSortMenu,
    });
    if (item && item.sc) {
      this.setState({
        val: item.sc,
        index: item.id,
      });
    }
  }

  handleClickOnScreen() {
    if (this.state.openSortMenu) {
      this.setState({
        openSortMenu: false,
      });
    }
  }

  renderSortMenu() {
    if (this.state.openSortMenu) {
      return (
        <>
          <TouchableOpacity
            style={{
              width: DEVICE_WIDTH,
              height: DEVICE_HEIGHT,
              zIndex: 1,
              top: -DEVICE_HEIGHT * 0.5,
              position: 'absolute',
            }}
            onPress={() => this.handleClickOnScreen()}
          />
          <SortMenuCard
            data={this.state.data}
            type="wallet"
            index={this.state.index}
            handleSortMenu={item => this.handleSortMenu(item)}
          />
        </>
      );
    }
    return null;
  }

  renderLoader() {
    if (this.props.isLoading === true) {
      return <Loader isLoading={this.props.isLoading} loaderStyle={0.25} loaderColor="#fff" />;
    }
    return null;
  }

  render() {
    const { publicKey, isLoading, transactions } = this.props;
    const selectedSortMenu = this.state.val;
    const fantomTransaction = transactions || [];
    const fantomTransactionArr = fantomTransaction.reverse();

    return (
      <View style={{ flex: 1 }}>
        {fantomTransactionArr.length > 0 && (
          <View
            style={{
              marginTop: 20,
              width: DEVICE_WIDTH - 32,
              alignSelf: 'center',
              backgroundColor: 'rgb(44,52,58)',
              borderRadius: 10,
            }}
          >
            <View style={style.headingCardViewStyle}>
              <Text style={style.headingCardTextStyle}>Transactions</Text>
            </View>
            <View
              style={[
                this.state.openSortMenu ? { opacity: 0.2 } : '',
                { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
              ]}
            >
              {this.renderLoader()}
              <DisplayTransaction
                fantomTransactionArr={fantomTransactionArr}
                selectedSortMenu={selectedSortMenu}
                allTransaction={ALL_TRANSACTION}
                publicKey={publicKey}
                isLoading={isLoading}
              />
            </View>
          </View>
        )}

        {/* <View style={style.tr
        ansactionSortIconStyle}>
              <TouchableOpacity onPress={() => this.toggleSortMenu()}>
                <Image source={sortMenuIcon} style={{ width: 33, height: 30 }} />
              </TouchableOpacity>
            </View> */}

        <View
          style={[
            this.state.openSortMenu ? { opacity: 0.2 } : '',
            { backgroundColor: 'rgb(14,14,18)' },
          ]}
        >
          {isLoading === false &&
            fantomTransactionArr.length === 0 && (
              <EmptyTransactionEntity
                title="No Transactions"
                message="(Recent transactions will be displayed here.)"
              />
            )}
        </View>
        {/* {this.renderSortMenu()} */}
      </View>
    );
  }
}

TransactionView.propTypes = {
  publicKey: PropTypes.string,
  fantomTransactionArr: PropTypes.array,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  transactions: state.transactionReducer.transactions,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionView);
