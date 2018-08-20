// import { TabNavigator, TabBarTop } from 'react-navigation';

// /**
//  * DepositScreen Tabs
//  */
// import PointScreen from '../../../component/homeScreen/depositScreen/depositPointScreen/';
// import FantomScreen from '../../../component/homeScreen/depositScreen/depositFantomScreen/';




// export default TabNavigator({
//     Point: { screen: PointScreen },
//     Fantom: { screen: FantomScreen },
// },
//     {
//         tabBarComponent: TabBarTop,
//         tabBarPosition: 'top',
//         tabBarOptions: {
//             activeTintColor: 'black',
//             inactiveTintColor: 'black',
//             labelStyle: {
//                 fontSize: 14,
//             },
//             style: {
//                 backgroundColor: 'white',
//                 shadowOffset: { width: 0, height: 0 },
//             },
//             indicatorStyle: {
//                 backgroundColor: 'red',
//                 borderBottomWidth: 3,
//                 borderBottomColor: 'red'
//             },
//             tabStyle: {
//                 height: 45,
//             },

//         },
//         animationEnabled: false,
//         swipeEnabled: false,
//     });



import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {
      console.log('hhkhkhkkk');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default TabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
});