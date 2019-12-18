import React, { Component } from 'react';
import SuccessScreen from '../../general/SuccessScreen';
class Success extends Component {
  onWalletImported() {}
  render() {
    return (
      <SuccessScreen
        onPress={this.onWalletImported}
        text="Tokens staked succesfully!"
      ></SuccessScreen>
    );
  }
}

export default Success;
