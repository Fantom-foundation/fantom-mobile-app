import React from 'react';
import { StackNavigator } from 'react-navigation';
import CreateWallet from './src/component/createWallet/';
import PrivacyPolicy from './src/component/privacyPolicy/';
import TermsConditions from './src/component/termsConditions/';

const Routing = StackNavigator({
    CreateWallet: { screen: CreateWallet },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
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
