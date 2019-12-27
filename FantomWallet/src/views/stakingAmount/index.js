// @flow
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import KeyPad from "../../components/general/keyPad";
import { NavigationService, routes } from "../../navigation/helpers";
import { convertFTMValue, formatNumber } from "~/utils/converts";
import { delegateAmount as delegateAmountAction } from "../../redux/staking/actions";
import { Colors, fonts, FontSize } from "../../theme";

const StakingAmount = (props: Props) => {
  const { validators, delegateAmount } = props;
  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [amount, setAmount] = useState("");
  const [ifStaking, setIfStaking] = useState(false);
  //  function for entered amount from KeyPad
  const handleInputNumber = item => {
    if (item === "<") {
      let num = amount.slice(0, -1);
      setAmount(num);
    } else {
      setAmount(amount.concat(item));
    }
  };

  const selectedValidatorId = props.navigation.getParam("validatorId");
  const validator = validators.find(
    validatorObj => validatorObj.id === selectedValidatorId
  );
  const stakingSpace = 15 * validator.totalStake - validator.delegatedMe;
  const dividend = Math.pow(10, 18);
  const availableSpace = formatNumber(
    Number((stakingSpace / dividend).toFixed(2))
  );
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
          <Text style={styles.validatorNode}>{validator.address}</Text>
          <Text style={styles.stakinSpace}>
            Staking space left: {availableSpace}
          </Text>
          {/*for the price entered   */}
          <Text style={{ ...styles.sendPrice }}>
            {amount ? formatNumber(amount) : 0}
          </Text>

          <View style={styles.availableAmountView}>
            <Text
              style={styles.availablePrice}
            >{`Available: ${availableSpace}`}</Text>
            <TouchableOpacity
              style={styles.maxButton}
              onPress={() => setAmount(availableSpace.toString())}
            >
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
            disabled={ifStaking}
            style={{
              ...styles.stakeButton,
              backgroundColor: !ifStaking ? Colors.lightGrey : Colors.grey
            }}
            onPress={() => {
              setIfStaking(true);
              delegateAmount({ amount, publicKey: validator.address });
              NavigationService.navigate(routes.root.Success);
            }}
          >
            <Text style={styles.stakeText}>
              {ifStaking ? "Staking..." : "Stake"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  validators: state.stakes.validators
});

const mapDispatchToProps = {
  delegateAmount: delegateAmountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(StakingAmount);
