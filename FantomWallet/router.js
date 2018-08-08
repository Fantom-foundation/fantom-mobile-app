import React from 'react';
import {
    StackNavigator,
  } from 'react-navigation';
  import CreateWallet from './src/component/CreateWallet/index';
  import Terms from './src/component/terms/';


const Routing = StackNavigator({
    CreateWallet: { screen: CreateWallet },
    Terms: { screen: Terms },
},
{
    headerMode: 'none',
});

export default class Router extends React.Component {
    render() {
        return (
            <Routing />
        );
    }
}
