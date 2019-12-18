import React, { Component } from 'react';
import SuccessScreen from '../../general/SuccessScreen';
class WalletImported extends Component {
    onWalletImported() {
      
    }
    render() {
        return (
            <SuccessScreen onPress={this.onWalletImported} text="Wallet imported!"></SuccessScreen>
        );
    }
}

export default WalletImported;
