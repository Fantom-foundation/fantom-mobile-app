import React from "react";
import { View, Text, ImageBackground,TouchableOpacity } from "react-native";
import styles from "../styles";
import {BackLogo} from "../../../../images";
import CardListItem from "./cardListItem";
import { NavigationService, routes } from "~/navigation/helpers";



const CardView = ({
  showList,
  showCard,
  data,
  isHiddenText,
  setCurrentWallet
}) => {
  const { name, publicKey, history, balance } = data;
  const handleCardClick=()=>{
    setCurrentWallet(data);
    NavigationService.navigate(routes.HomeScreen.Wallet)
  }
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
              {isHiddenText ? "********" : balance + " FTM"}
            </Text>
            <Text style={styles.bottomCardSubText}>
              {isHiddenText ? "" : "$" + balance}
            </Text>
          </View>
          <ImageBackground style={styles.cardImageStyle} source={BackLogo} />
        </TouchableOpacity>
      )}
      {showList && history && history.length > 0 && (
        <CardListItem data={history} isHiddenText={isHiddenText} />
      )}
    </View>
  );
};
export default CardView;
