// @flow
// Library
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
// style
import styles from './styles';
// components
import EmptyTransactionEntity from './transactionEntity/emptyTransactionEntity';
import SortMenuCard from '~/components/SortMenuCard';
import DisplayTransaction from './displayTransactions';
import Loader from '~/components/general/Loader';
import sortMenuIcon from '~/images/arrow_With_bar.png';

import { SENT, RECEIVED, ALL_TRANSACTION, DEVICE_HEIGHT, DEVICE_WIDTH } from '~/common/constants';

type Props = {
  publicKey: string,
  fantomTransactionArr: Array<string>,
  isLoading: boolean,
};

/**
 * TransactionView: This component is meant for rendering transactions done on particuler wallet.
 */
export const TransactionView = ({ publicKey, isLoading, fantomTransactionArr = [] }: Props) => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const data = [
    { key: 'All Payments', id: 0, sc: ALL_TRANSACTION },
    { key: 'Received Payments', id: 1, sc: RECEIVED },
    { key: 'Sent Payments', id: 2, sc: SENT },
  ];
  const [index, setIndex] = useState(0);
  const [val, setVal] = useState(ALL_TRANSACTION);

  const toggleSortMenu = () => setOpenSortMenu(!openSortMenu);
  const handleSortMenu = item => {
    setOpenSortMenu(!openSortMenu);
    if (item && item.sc) {
      setVal(item.sc);
      setIndex(item.id);
    }
  };
  const handleClickOnScreen = () => {
    if (openSortMenu) setOpenSortMenu(false);
  };

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
          <View style={styles.headingCardViewStyle}>
            <Text style={styles.headingCardTextStyle}>Transactions</Text>
          </View>
          <View
            style={[
              openSortMenu ? { opacity: 0.2 } : '',
              { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
            ]}
          >
            {isLoading && <Loader isLoading={isLoading} loaderStyle={0.25} loaderColor="#fff" />}
            <DisplayTransaction
              fantomTransactionArr={fantomTransactionArr}
              selectedSortMenu={val}
              allTransaction={ALL_TRANSACTION}
              publicKey={publicKey}
              isLoading={isLoading}
            />
          </View>
        </View>
      )}

      <View style={styles.transactionSortIconStyle}>
        <TouchableOpacity onPress={toggleSortMenu}>
          <Image source={sortMenuIcon} style={styles.sortMenuIcon} />
        </TouchableOpacity>
      </View>

      <View style={[openSortMenu ? { opacity: 0.2 } : '', { backgroundColor: 'rgb(14,14,18)' }]}>
        {isLoading === false && fantomTransactionArr.length === 0 && (
          <EmptyTransactionEntity
            title="No Transactions"
            message="(Recent transactions will be displayed here.)"
          />
        )}
      </View>
      {openSortMenu && (
        <>
          <TouchableOpacity
            style={{
              width: DEVICE_WIDTH,
              height: DEVICE_HEIGHT,
              zIndex: 1,
              top: -DEVICE_HEIGHT * 0.5,
              position: 'absolute',
            }}
            onPress={handleClickOnScreen}
          />
          <SortMenuCard data={data} type="wallet" index={index} handleSortMenu={handleSortMenu} />
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  transactions: state.wallet.history,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionView);
