// @flow
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import KeyPad from "../../components/general/keyPad";
import { Colors } from "../../theme/colors";
import { NavigationService, routes } from "../../navigation/helpers";

const StakingAmount = ({}: Props) => {
  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [amount, setAmount] = useState("");
  const price = "43,680";
  //  function for entered amount from KeyPad
  const handleInputNumber = item => {
    if (item === "<") {
      let num = amount.slice(0, -1);
      setAmount(num);
    } else {
      setAmount(amount.concat(item));
    }
  };

  //formating Number
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => NavigationService.pop()}
        >
          <FontAwesome name="close" size={22} color={Colors.white} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.validatorNode}>Validator node 1</Text>
          <Text style={styles.stakinSpace}>Staking space left: 0</Text>
          {/*for the price entered   */}
          <Text style={styles.sendPrice}>
            {amount ? formatNumber(amount) : 0}
          </Text>

          <View style={styles.availableAmountView}>
            <Text style={styles.availablePrice}>{`Available: ${price}`}</Text>
            <TouchableOpacity style={styles.maxButton}>
              <Text style={styles.maxButtonText}>Max</Text>
            </TouchableOpacity>
          </View>
          {/* KeyPad  */}
          <KeyPad
            buttonStyle={styles.numberButton}
            textStyle={styles.numberText}
            keyPad={keyPad}
            keyPadStyle={styles.keyPadView}
            handleInputNumber={item => handleInputNumber(item)}
          />

          {/* Stake Button */}
          <TouchableOpacity
            style={styles.stakeButton}
            onPress={() =>
              NavigationService.navigate(routes.root.ValidatorNode)
            }
          >
            <Text style={styles.stakeText}>Stake</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default StakingAmount;
