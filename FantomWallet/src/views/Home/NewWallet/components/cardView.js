import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import { BackLogo } from "../../../../images";
import CardListItem from "./cardListItem";
import { NavigationService, routes } from "~/navigation/helpers";
import { balanceToDollar, balanceWithSeprators } from "~/utils/converts.js";

const CardView = ({
  showList,
  showCard,
  data,
  isHiddenText,
  setCurrentWallet,
  emptyView
}) => {
  const { name, publicKey, history, balance } = data;
  const handleCardClick = () => {
    setCurrentWallet(data);
    NavigationService.navigate(routes.HomeScreen.Wallet);
  };

  return (
    <View style={{ justifyContent: "center" }}>
      {showCard && data && (
        <TouchableOpacity
          onPress={() => handleCardClick()}
          style={styles.cardStyle}
        >
          <Text style={styles.cardHeaderText}>{name || ""}</Text>
          <Text style={styles.cardSecretText}>{publicKey || ""}</Text>
          <View style={styles.cardBottomTextContainer}>
            <Text style={styles.bottomCardText}>
              {isHiddenText
                ? "********"
                : balanceWithSeprators(balance) + " FTM"}
            </Text>
            <Text style={styles.bottomCardSubText}>
              {isHiddenText ? "*******" : "$" + balanceToDollar(balance, 2)}
            </Text>
          </View>
          <ImageBackground style={styles.cardImageStyle} source={BackLogo} />
        </TouchableOpacity>
      )}
      {showList && history && history.length > 0 ? (
        <CardListItem
          data={history}
          isHiddenText={isHiddenText}
          publicKey={publicKey}
        />
      ) : (
        <View
          style={{
            height: emptyView && history && history.length <= 0 ? 600 : 0
          }}
        />
      )}
    </View>
  );
};
export default CardView;
