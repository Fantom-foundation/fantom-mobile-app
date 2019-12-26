import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import { BackLogo } from "~/images";
import { NavigationService, routes } from "~/navigation/helpers";

import { balanceToDollar } from "~/utils/converts.js";

const StickyHeader = ({ data, setCurrentWallet }) => {
  const { name, balance } = data;
  const handleCardClick = () => {
    setCurrentWallet(data);
    NavigationService.navigate(routes.HomeScreen.Wallet);
  };
  return (
    <TouchableOpacity
      onPress={() => handleCardClick()}
      style={styles.stickyHeaderStyle}
    >
      <Text style={styles.cardHeaderText}>{name || ""}</Text>
      <Text style={styles.bottomCardText}>{`${Number(balance).toFixed(
        2
      )} FTM`}</Text>
      {/* <View style={styles.cardBottomTextContainer}> */}
      <Text style={styles.bottomCardSubText}>{`$${balanceToDollar(
        balance,
        2
      )}`}</Text>
      {/* </View> */}
      <ImageBackground
        style={styles.stickyHeaderImageStyle}
        source={BackLogo}
      />
    </TouchableOpacity>
  );
};
export default StickyHeader;
