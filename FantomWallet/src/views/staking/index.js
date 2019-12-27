// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import styles from "./styles";
import question from "../../images/question.png";
import Carousel from "react-native-snap-carousel";
import { Metrics, getWidth } from "../../utils/pixelResolver";
import Modal from "../../components/general/modal";
import { NavigationService, routes } from "../../navigation/helpers";
import { connect } from "react-redux";
import { Colors } from "../../theme";
import { formatNumber } from "~/utils/converts";
import { delegateByAddresses as delegateByAddressesAction } from "~/redux/staking/actions";

const data = [
  {
    title: "My Fantom Wallet",
    availableAmount: "43,680 FTM",
    availableText: "Available to stake",
    currenrtStaking: "160,323 FTM",
    currenrtStakingText: "Currently staking",
    earnedRewards: "3,206 FTM",
    earnedRewardsText: "Earned rewards",
    backgroundColor: "#416ed5",
    titleColor: "#ffffff"
  },
  {
    title: "Aqua Wallet",
    availableAmount: "200,000 FTM",
    availableText: "Available to stake",
    currenrtStaking: "0 FTM",
    currenrtStakingText: "Currently staking",
    earnedRewards: "0 FTM",
    earnedRewardsText: "Earned rewards",
    backgroundColor: "#59c5dd",
    titleColor: "#2b3954"
  }
];

const modalText = "You need at least 1 FTM to \n stake.";
const amountHightModalText =
  "The amount exceeds the staking\n space left on this validator node.\n\nPlease input a lower amount or\n choose a different validator\n node.";
const unstakeText =
  "Are you sure you want to  request to withdraw \n your tokens from staking??\n\nThe tokens will be available\n after 7 days in your wallet.";

const Staking = (props: Props) => {
  const [isUnstakeModalOpened, openUnstakingModal] = useState(false);
  const [isWithdrawModalOpened, openWithdrawModal] = useState("");
  const { delegateByAddresses, stakes, wallets } = props;
  useEffect(() => {
    delegateByAddresses();
  }, []);

  const formatValues = (value, isDividedBy = true) => {
    const dividend = isDividedBy ? Math.pow(10, 18) : 1;
    return formatNumber(Number((value / dividend).toFixed(2)));
  };

  const _renderItem = ({ item, index }) => {
    const stakeData = stakes.find(stake => stake.publicKey === item.publicKey);
    if (!stakeData) {
      return null;
    }
    const availableToStake = item.balance - stakeData.amount;
    const currentDate = new Date();
    const nextSevenDays = currentDate.setDate(currentDate.getDate() + 7);
    const currentlyStaking = formatValues(stakeData.amount);
    const timeLeft =
      new Date().getTime() -
      (formatValues(stakeData.deactivatedTime || 0) + nextSevenDays);
    return (
      <View
        style={{
          ...styles.walletView,
          marginLeft: index !== 0 ? 20 : 0
        }}
      >
        <View style={{ paddingHorizontal: 22 }}>
          <Text style={{ ...styles.titleView }}>{item.name}</Text>
          <Text style={{ ...styles.amountStyle }}>
            {formatValues(availableToStake, false)}
          </Text>
          <Text style={{ ...styles.walletTextStyle }}>Available to stake</Text>

          <Text style={{ ...styles.amountStyle }}>{currentlyStaking}</Text>
          <Text style={{ ...styles.walletTextStyle }}>Currently staking</Text>
          <Text style={{ ...styles.amountStyle }}>
            {formatValues(stakeData.claimedRewards)}
          </Text>
          <Text style={{ ...styles.walletTextStyle }}>Earned rewards</Text>
          {timeLeft > 0 ? (
            <Text style={{ ...styles.bottomTextStyle }}>
              Your {currentlyStaking} will be available in
              {timeLeft}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => openWithdrawModal(currentlyStaking)}
            >
              <Text style={{ ...styles.bottomTextStyle }}>
                Withdraw {currentlyStaking} FTM now
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonView}>
          {/* {availableToStake.isDeligate ? ( */}
          {true ? (
            <TouchableOpacity
              style={styles.buttonUnstakeView}
              onPress={() => openUnstakingModal(currentlyStaking)}
            >
              <Text
                style={{
                  ...styles.buttonText
                }}
              >
                Unstake
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                ...styles.buttonUnstakeView,
                backgroundColor: Colors.royalBlue
              }}
            />
          )}
          <TouchableOpacity
            style={styles.buttonStakeView}
            onPress={handleStakeButton}
          >
            <Text
              style={{
                ...styles.buttonText
              }}
            >
              Stake
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // onbackButtonPress
  const handleBackPress = () => {};

  //onUnstake Button
  const handleUnstakePress = () => {
    const { navigation } = props;
    navigation.navigate("WalletImported", {
      text: "Requested to unstake successfully",
      navigationRoute: "Staking"
    });
  };

  //onUnstake Button
  const handleWithdrawPress = () => {
    const { navigation } = props;
    navigation.navigate("WalletImported", {
      text: "Tokens successfully withdrawn!",
      navigationRoute: "Staking"
    });
  };

  const handleStakeButton = () => {
    NavigationService.navigate(routes.root.ValidatorNode);
  };
  const withdrawText = `Withdraw ${isWithdrawModalOpened} FTM now`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stakingTextView}>
        <Text style={styles.stakingText}>Staking</Text>
        {/* <Image
          source={question}
          resizeMode="contain"
          style={styles.imagestyle}
        ></Image> */}
      </View>
      <View style={styles.crauselView}>
        <Carousel
          data={wallets}
          renderItem={_renderItem}
          sliderWidth={Metrics.screenWidth}
          itemWidth={getWidth(280)}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>

      {/* Not Enought Ftm to Stake */}
      {/* <Modal
        modalText={modalText}
        modalTextStyle={styles.modalTextStyle}
        buttonViewStyle={styles.notEnoughSpaceButtonView}
        buttons={[
          {
            name: "Back",
            style: styles.backButtonStyle,
            onPress: handleBackPress
          }
        ]}
      /> */}

      {/* Modal For Amount Too High */}
      {/* <Modal
        modalText={amountHightModalText}
        modalTextStyle={styles.modalTextStyle}
        buttonViewStyle={styles.notEnoughSpaceButtonView}
        buttons={[
          {
            name: "Back",
            style: styles.backButtonStyle,
            onPress: handleBackPress,
            textStyle: styles.backButton
          }
        ]}
      /> */}

      {/* Unstake Confirm */}
      {!!isWithdrawModalOpened && (
        <Modal
          modalText={withdrawText}
          stakingView={styles.unstakeOuterView}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.unstakeView}
          buttons={[
            {
              name: "Back",
              style: styles.backButtonStyle,
              onPress: () => openWithdrawModal(""),
              textStyle: styles.backButton
            },
            {
              name: "Withdraw",
              style: styles.unstakeButton,
              onPress: handleWithdrawPress,
              textStyle: styles.unStakeText
            }
          ]}
        />
      )}

      {isUnstakeModalOpened && (
        <Modal
          modalText={unstakeText}
          stakingView={styles.unstakeOuterView}
          modalTextStyle={styles.modalTextStyle}
          buttonViewStyle={styles.unstakeView}
          buttons={[
            {
              name: "Back",
              style: styles.backButtonStyle,
              onPress: () => openUnstakingModal(!isUnstakeModalOpened),
              textStyle: styles.backButton
            },
            {
              name: "Unstake",
              style: styles.unstakeButton,
              onPress: handleUnstakePress,
              textStyle: styles.unStakeText
            }
          ]}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  stakes: state.stakes.data,
  wallets: state.wallet.walletsData
});

const mapDispatchToProps = {
  delegateByAddresses: delegateByAddressesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
