import React, { Component } from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";
class Success extends Component {
  handleOnPress = () => {
    NavigationService.navigate(routes.root.HomeScreen);
  };
  render() {
    return (
      <SuccessScreen
        onPress={this.handleOnPress}
        text="Tokens staked succesfully!"
      ></SuccessScreen>
    );
  }
}

export default Success;
