import { TabNavigator, TabBarTop } from 'react-navigation';
import {Dimensions} from 'react-native';

/**
 * WalletScreen Tabs
 */
import PointTab from '../../../component/homeScreen/walletScreen/walletPointScreen/';
import FantomTab from '../../../component/homeScreen/walletScreen/walletFantomScreen/';
import EthererumTab from '../../../component/homeScreen/walletScreen/walletEthererumScreen/';


const deviceWidth = Dimensions.get('window').width;

export default TabNavigator({
    Point: { screen: PointTab },
    Fantom: { screen: FantomTab },
    Ethereum: { screen: EthererumTab },
},
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            labelStyle: {
                fontSize: deviceWidth < 320 ? 12 : 14,
            },
            style: {
                backgroundColor: '#fff',
                shadowOffset: {width: 0, height: 0},
            },
            indicatorStyle: {
                backgroundColor: 'red', 
                borderBottomWidth: 3,
                borderBottomColor: 'red'
            },
            tabStyle: {
                height: 45,
              },

        },
        animationEnabled: false,
        swipeEnabled: false,
    });
