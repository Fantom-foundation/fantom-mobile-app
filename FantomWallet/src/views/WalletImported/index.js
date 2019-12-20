import React from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";

const WalletImported = (props:TSettingsScreenTypes) => {
  const { navigation } = props;
  const publicKey = navigation.getParam("publicKey", "");

  return (
    <SuccessScreen
      onPress={() =>
        NavigationService.navigate(routes.root.WalletInfo, { publicKey })
      }
      text="Wallet imported!"
    ></SuccessScreen>
  );
};

export default WalletImported;
