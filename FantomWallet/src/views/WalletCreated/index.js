import React, { Component } from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";
class WalletCreated extends Component {
  handleOnPress = () => {
    NavigationService.navigate(routes.root.WalletInfo);
  };
  render() {
    return (
      <SuccessScreen
        onPress={this.handleOnPress}
        text="Wallet created!"
      ></SuccessScreen>
    );
  }
}

export default WalletCreated;
