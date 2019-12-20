// @flow
import React from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./styles";
import { Colors } from "../../../theme";


/**
 * Tab : This component is meant for rendering diffrent tabs on home screen navigation tab bar.
 */
const Tab = (props: TNavigationTabTypes) => {
  const {
    activeTabIndex,
    index,
    inActiveTabColor,
    tabInfo,
    handleSelectedTab
  }=props
  return (
    <TouchableOpacity
      style={{
        ...styles.tabStyle,
        backgroundColor: inActiveTabColor
      }}
      onPress={() => handleSelectedTab(tabInfo.route)}
    >
      <Image
        source={tabInfo.icon}
        resizeMode="contain"
        style={{
          ...styles.tabIconStyle,
          tintColor: activeTabIndex === index ? Colors.white : Colors.lightGrey
        }}
      />
    </TouchableOpacity>
  );
};

export default Tab;
