import React, { Component } from 'react';
import { Text } from 'react-native';

/**
 * WalletScreen Tabs
 */
import PointTab from '../../../../../component/homeScreen/walletScreen/walletPointScreen/';
import FantomTab from '../../../../../component/homeScreen/walletScreen/walletFantomScreen/';
import EthererumTab from '../../../../../component/homeScreen/walletScreen/walletEthererumScreen/';

class WalletTabInfo extends Component {
    render() {
        const { tabRenderInfo, navigation, } = this.props;

        if (tabRenderInfo && tabRenderInfo !== null && tabRenderInfo !== undefined) {
            if (tabRenderInfo === 'Point') {
                return <PointTab navigation={navigation} />
            } else if (tabRenderInfo === 'Fantom') {
                return <FantomTab navigation={navigation} />
            } else if (tabRenderInfo === 'Ethererum') {
                return <EthererumTab navigation={navigation} />
            }
        }
        return (
            <Text></Text>
        )
    }
}
export default WalletTabInfo;
