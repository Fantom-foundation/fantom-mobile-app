import React, { Component } from 'react';
import { Text } from 'react-native';

/**
 * DepositScreen Tabs
 */
import PointTab from '../../../depositScreen/depositPointScreen/';
import FantomTab from '../../../depositScreen/depositFantomScreen/';
import EthererumTab from '../../../depositScreen/depositEthereumScreen/';

class DepositTabInfo extends Component {
    render() {
        const { tabRenderInfo, navigation, } = this.props;

        if (tabRenderInfo && tabRenderInfo !== null && tabRenderInfo !== undefined) {
            if (tabRenderInfo === 'Point') {
                return <PointTab navigation={navigation} />
            } else if (tabRenderInfo === 'Fantom') {
                return <FantomTab navigation={navigation} />
            } 
            else if (tabRenderInfo === 'Ethererum') {
                return <EthererumTab navigation={navigation} />
            }
        }
        return (
            <Text/>
        )
    }
}
export default DepositTabInfo;
