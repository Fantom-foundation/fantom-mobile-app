import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { getHeight, getWidth } from "../../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../../theme";
import WalletMenu from "./walletMenu";
import CardView from "./cardView"

const CardHeader = props => {
  const {
    showCard,
    isListView,
    changeView,
    children,
    margin,
    setCardHiddenView,
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
          <Text style={styles.headerText}>$ {totalBalance}</Text>
          <TouchableOpacity onPress={() => setCardHiddenView()}>
            <Icon
              style={styles.iconStyle}
              name={"eye"}
              size={18}
              color={Colors.textBlack}
            />
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
