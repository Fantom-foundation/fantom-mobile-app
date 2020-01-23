import React from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";
import { Messages } from "../../theme";

const WalletCreated = (props: TSettingsScreenTypes) => {
  const { navigation } = props;
  const publicKey = navigation.getParam("publicKey", "");
  return (
    <SuccessScreen
      onPress={() =>
        NavigationService.navigate(routes.root.WalletInfo, { publicKey })
      }
      text={Messages.walletCreated}
    ></SuccessScreen>
  );
};

export default WalletCreated;
