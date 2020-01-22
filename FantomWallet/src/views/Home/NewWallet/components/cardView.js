import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import { FantomLogo } from "../../../../images";
import CardListItem from "./cardListItem";
import { NavigationService, routes } from "~/navigation/helpers";
import { balanceToDollar, balanceWithSeprators } from "~/utils/converts.js";

const CardView = ({
  showList,
  showCard,
  data,
  isHiddenText,
  setCurrentWallet,
  handleTransactionClick
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
              {isHiddenText
                ? "*******"
                : balance
                ? "$" + balanceToDollar(balance, 2)
                : "$0"}
            </Text>
          </View>
          <ImageBackground style={styles.cardImageStyle} source={FantomLogo} />
        </TouchableOpacity>
      )}
      {showList && history && history.length > 0 && (
        <CardListItem
          data={history}
          isHiddenText={isHiddenText}
          publicKey={publicKey}
          handleTransactionClick={handleTransactionClick}
        />
      )}
    </View>
  );
};
export default CardView;
