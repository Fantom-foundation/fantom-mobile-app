import React, { Component } from 'react';
import { Text } from 'react-native';

import WalletTab from '../../../walletScreen/';
import WithdrawTab from '../../../withdrawScreen/';
import DepositTab from '../../../depositScreen/';

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