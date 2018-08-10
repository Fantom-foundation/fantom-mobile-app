import React from 'react';
import { StackNavigator } from 'react-navigation';
import CreateWallet from './src/component/createWallet/';
import PrivacyPolicy from './src/component/privacyPolicy/';
import TermsConditions from './src/component/termsConditions/';
import CaptionOutput from './src/component/captionOutput/index';
import CaptchaVerification from './src/component/captchaVerification/index';
import AddressBook from './src/component/addressBook/index';

const Routing = StackNavigator({
    CreateWallet: { screen: CreateWallet },
    Terms: { screen: TermsConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    CaptionOutput: { screen: CaptionOutput },
    CaptchaVerification: { screen: CaptchaVerification },
    AddressBook: { screen: AddressBook}
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
