import { TabNavigator, TabBarTop } from 'react-navigation';

/**
 * DepositScreen Tabs
 */
import PointScreen from '../../../component/homeScreen/depositScreen/depositPointScreen/';
import FantomScreen from '../../../component/homeScreen/depositScreen/depositFantomScreen/';
import EthereumScreen from '../../../component/homeScreen/depositScreen/depositEthereumScreen/';




export default TabNavigator({
    Point: { screen: PointScreen },
    Fantom: { screen: FantomScreen },
    Ethereum: { screen: EthereumScreen},
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
                shadowOffset: { width: 0, height: 0 },
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

