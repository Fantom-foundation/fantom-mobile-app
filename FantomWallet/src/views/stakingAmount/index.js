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
import { formatNumber } from "~/utils/converts";
import { delegateAmount as delegateAmountAction } from "../../redux/staking/actions";
import { Colors, fonts, FontSize } from "../../theme";

const StakingAmount = (props: Props) => {
  const { validators, delegateAmount, keys, currentWallet } = props;

  const keyPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"];
  const [amount, setAmount] = useState("");
  //  function for entered amount from KeyPad
  const handleInputNumber = item => {
    getPrivateKey();
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
  const handleMaxStake = () => {
    const { currentWallet } = props;
    const { balance } = currentWallet;

    if (balance > availableSpace) setAmount(availableSpace.toString());
    else if (balance < availableSpace)
      setAmount(
        Number(balance)
          .toFixed(2)
          .toString()
      );
    else if (balance === availableSpace) setAmount(availableSpace.toString());
  };

  const getPrivateKey = () => {
    const { keys, currentWallet } = props;
    const { wallets } = keys;
    if (wallets && wallets.length > 0) {
      const key = wallets.find(w => w.publicKey === currentWallet.publicKey);
      const { privateKey } = key;
      return privateKey;
    }
    return null;
  };
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
            <TouchableOpacity style={styles.maxButton} onPress={handleMaxStake}>
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
            onPress={() => {
              delegateAmount({
                value: amount,
                publicKey: currentWallet.publicKey,
                validatorId: validator.id
              });
              NavigationService.navigate(routes.root.StakingAmount);
            }}
          >
            <Text style={styles.stakeText}>Stake</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  validators: state.stakes.validators,
  currentWallet: state.wallet.currentWallet,
  keys: state.keys
});

const mapDispatchToProps = {
  delegateAmount: delegateAmountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(StakingAmount);
