import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import GridIcon from "../../../../images/card-01.png";
import { getHeight, getWidth } from "../../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../../theme";

const WalletMenu = props => {
  const { isListView, customStyle, changeView } = props;
  return (
    <View style={[styles.listHeader, customStyle]}>
      <Text style={styles.headerText}>Wallets</Text>
      {isListView ? (
        <TouchableOpacity
          style={styles.gridIcon}
          onPress={() => changeView(!isListView)}
        >
          <Image
            height={getHeight(16)}
            width={getWidth(16)}
            source={GridIcon}
          ></Image>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => changeView(!isListView)}>
          <Icon
            style={styles.iconStyle}
            name={isListView ? "list-ol" : "list-ul"}
            size={16}
            color={Colors.textBlack}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default WalletMenu;
