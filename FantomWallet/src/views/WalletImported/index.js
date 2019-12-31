import React from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";

const WalletImported = (props: TSettingsScreenTypes) => {
  const { navigation } = props;
  const publicKey = navigation.getParam("publicKey", "");
  const text = navigation.getParam("text");
  const navigationRoute = navigation.getParam("navigationRoute");
  return (
    <SuccessScreen
      onPress={() => {
        if (navigationRoute && navigationRoute === "Back") {
          NavigationService.navigate(routes.HomeScreen["Staking"], {
            isUnstaking: true
          });
          return;
        }
        if (navigationRoute) {
          NavigationService.navigate(navigationRoute);
          return;
        }
        NavigationService.navigate(routes.root.WalletInfo, { publicKey });
      }}
      text={text || "Wallet imported!"}
    ></SuccessScreen>
  );
};

export default WalletImported;
