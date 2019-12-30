import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles";
import { getHeight, getWidth } from "../../../../utils/pixelResolver";
import WalletMenu from "./walletMenu";
import CardView from "./cardView";
import { EyeOpen, EyeClose } from "../../../../images";
import { balanceToDollar } from "~/utils/converts.js";
const CardHeader = props => {
  const {
    showCard,
    isListView,
    changeView,
    children,
    margin,
    setCardHiddenView,
    isHiddenText,
    totalBalance
  } = props;

  return (
    <View>
      <View
        style={[
          styles.headerContainer,
          { paddingHorizontal: getWidth(margin) }
        ]}
      >
        <View style={styles.headerItems}>
          <Text style={styles.headerText}>
            {isHiddenText ? "*******" : `$${balanceToDollar(totalBalance, 2)}`}
          </Text>
          <TouchableOpacity onPress={() => setCardHiddenView()}>
            {isHiddenText ? (
              <Image
                source={EyeClose}
                resizeMode="contain"
                style={styles.eyeOffIcon}
              ></Image>
            ) : (
              <Image
                source={EyeOpen}
                resizeMode="contain"
                style={styles.eyeIcon}
              ></Image>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeading}>Total balance</Text>
      </View>
      <WalletMenu
        isListView={isListView}
        changeView={changeView}
        customStyle={{
          marginVertical: getHeight(40),
          marginHorizontal: getWidth(margin)
        }}
      />
      {children}
    </View>
  );
};
export default CardHeader;
