import React, { Component } from 'react';
import { Text } from 'react-native';

import WalletTab from '../../../../component/homeScreen/walletScreen/';
import WithdrawTab from '../../../../component/homeScreen/withdrawScreen/';
import DepositTab from '../../../../component/homeScreen/depositScreen/';

class TabInfo extends Component {

    render() {
        const { tabRenderInfo, navigation, } = this.props;

        if (tabRenderInfo && tabRenderInfo !== null && tabRenderInfo !== undefined) {
            if (tabRenderInfo === 'walletIcon') {
                return <WalletTab navigation={navigation} />
            } else if (tabRenderInfo === 'sendIcon') {
                return <WithdrawTab navigation={navigation} />
            } else if (tabRenderInfo === 'depositIcon') {
                return <DepositTab navigation={navigation} />
            }
        }
        return (
            <Text></Text>
        )
    }
}
export default TabInfo;