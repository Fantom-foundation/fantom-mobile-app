import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import WalletTab from '../../../walletScreen';
import WithdrawTab from '../../../withdrawScreen';
import DepositTab from '../../../depositScreen';

/**
 * TabInfo: This component is meant for rendering different screen based on selected tab from navigation tab bar.
 */
class TabInfo extends PureComponent {
  render() {
    const {
      tabRenderInfo,
      navigation,
      balance,
      transactionData,
      isLoading,
      onRefresh,
    } = this.props;
    if (tabRenderInfo && tabRenderInfo !== null && tabRenderInfo !== undefined) {
      if (tabRenderInfo === 'walletIcon') {
        return (
          <WalletTab
            navigation={navigation}
            balance={balance}
            transactionData={transactionData}
            isLoading={isLoading}
            onRefresh={onRefresh}
          />
        );
      }
      if (tabRenderInfo === 'sendIcon') {
        return <WithdrawTab navigation={navigation} />;
      }
      if (tabRenderInfo === 'depositIcon') {
        return <DepositTab navigation={navigation} />;
      }
    }
    return <Text />;
  }
}
export default TabInfo;
