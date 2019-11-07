import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './style';
import WalletViewInfo from '../walletViewInfo';

export const WalletNavigationBar = ({
  balance,
  transactionData,
  isLoading,
  navigation,
  onRefresh,
}) => {
  const tabRenderInfo = 'Point';

  // coinst handleSelectedTab = (index, tabRenderInfo) => {
  //   setTabRenderInfo(tabRenderInfo)
  // }

  return (
    <View style={style.mainContainerStyle}>
      <View style={style.tabInfoStyle}>
        <WalletViewInfo
          navigation={navigation}
          selectedTab={tabRenderInfo}
          transactionData={transactionData}
          balance={balance}
          isLoading={isLoading}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
});

WalletNavigationBar.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transactionData: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func,
};
export default connect(mapStateToProps)(WalletNavigationBar);
