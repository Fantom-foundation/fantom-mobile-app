import React, { Component } from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";

const WalletCreated = (props:TSettingsScreenTypes) => {
  const { navigation } = props;
  const publicKey = navigation.getParam("publicKey", "");
  return (
    <SuccessScreen
      onPress={()=> NavigationService.navigate(routes.root.WalletInfo, { publicKey })}
      text="Wallet created!"
    ></SuccessScreen>
  );
};

export default WalletCreated;

