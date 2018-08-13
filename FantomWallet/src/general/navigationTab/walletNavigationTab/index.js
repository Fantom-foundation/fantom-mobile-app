import { TabNavigator, TabBarTop } from 'react-navigation';

/**
 * WalletScreen Tabs
 */
import PointTab from '../../../component/homeScreen/walletScreen/walletPointScreen/';
import FantomTab from '../../../component/homeScreen/walletScreen/walletFantomScreen/';
import EthererumTab from '../../../component/homeScreen/walletScreen/walletEthererumScreen/';



export default TabNavigator({
    Point: { screen: PointTab },
    Fantom: { screen: FantomTab },
    Ethererum: { screen: EthererumTab },
},
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: 'white',
            },
            indicatorStyle: {
                backgroundColor: 'red', 
                fontWeight: 'bold',
            },
            tabStyle: {
                height: 45,
              },
        },
        animationEnabled: false,
        swipeEnabled: false,
    });
