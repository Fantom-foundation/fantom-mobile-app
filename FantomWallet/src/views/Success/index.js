import React from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";
import { Messages } from "../../theme";
const Success = props => {
  const handleOnPress = () => {
    NavigationService.navigate(routes.root.HomeScreen);
  };
  return (
    <SuccessScreen
      onPress={handleOnPress}
      text={Messages.tokenStakedSuccessfull}
    ></SuccessScreen>
  );
};

export default Success;
