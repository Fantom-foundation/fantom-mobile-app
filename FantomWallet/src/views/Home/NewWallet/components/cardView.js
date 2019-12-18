import React from "react";
import { View, Text, ImageBackground,TouchableOpacity } from "react-native";
import styles from "../styles";
import CardImage from "../../../../images/fantomWhiteIcon.png";
import CardListItem from "./cardListItem";
import { NavigationService, routes } from "~/navigation/helpers";
import { getHeight, getWidth } from "../../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../../theme";




const CardView = ({ showList, showCard, data, isHiddenText }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      {showCard && data && (
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(routes.HomeScreen.Wallet)
          }
          style={[styles.cardStyle, { backgroundColor: data.color }]}
        >
          <Text style={styles.cardHeaderText}>My Fantom Wallet</Text>
          <Text style={styles.cardSecretText}>
            0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
          </Text>
          <View style={styles.cardBottomTextContainer}>
            <Text style={styles.bottomCardText}>
              {isHiddenText ? "********" : "1.03 FTM"}
            </Text>
            <Text style={styles.bottomCardSubText}>
              {isHiddenText ? "" : "$180.46"}
            </Text>
          </View>
          <ImageBackground style={styles.cardImageStyle} source={CardImage} />
        </TouchableOpacity>
      )}
      {showList && <CardListItem data={data} isHiddenText={isHiddenText} />}
    </View>
  );
};
export default CardView;
