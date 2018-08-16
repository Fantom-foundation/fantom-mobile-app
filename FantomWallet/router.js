import React from 'react';
import { StackNavigator } from 'react-navigation';

import CreateWallet from './src/component/createWallet/';
import PrivacyPolicy from './src/component/privacyPolicy/';
import TermsConditions from './src/component/termsConditions/';
import CaptionOutput from './src/component/captionOutput/index';
import HomeScreen from './src/component/homeScreen/';
import CaptchaVerification from './src/component/captchaVerification/index';
import AddressBook from './src/component/addressBook/index';
import QRScanner from './src/component/qr/scanner/view';
import QRGenerator from './src/component/qr/generator/';

const Routing = StackNavigator({
    CreateWallet: { screen: CreateWallet },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    CaptionOutput: { screen: CaptionOutput },
    HomeScreen: { screen: HomeScreen },
    CaptchaVerification: { screen: CaptchaVerification },
    AddressBook: { screen: AddressBook},
    QRScanner: { screen: QRScanner },
    QRGenerator: { screen: QRGenerator },
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
