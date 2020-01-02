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
import {
  delegateByAddresses as delegateByAddressesAction,
  delegateUnstake as delegateUnstakeAction
} from "~/redux/staking/actions";

const modalText = "You need at least 1 FTM to \n stake.";
const amountHightModalText =
  "The amount exceeds the staking\n space left on this validator node.\n\nPlease input a lower amount or\n choose a different validator\n node.";
const unstakeText =
  "Are you sure you want to  request to withdraw \n your tokens from staking??\n\nThe tokens will be available\n after 7 days in your wallet.";

const Staking = (props: Props) => {
  const [isUnstakeModalOpened, openUnstakingModal] = useState(false);
  const [ifUnstaking, setIfUnstaking] = useState(false);
  const [isWithdrawModalOpened, openWithdrawModal] = useState("");
  const [unstakeKey, setUnstakeKey] = useState("");
  const { delegateByAddresses, stakes, wallets, navigation } = props;

  const [values, setValues] = useState(wallets);
  const [carouselWidth, setCarouselWidth] = useState(getWidth(279));
  useEffect(() => {
    setValues(wallets);
    delegateByAddresses();
    setTimeout(() => {
      setCarouselWidth(getWidth(280));
    }, 500);
  }, []);

  useEffect(() => {
    if (values && values.length > 1) {
      if (!!carousRef) carousRef.triggerRenderingHack();
      setTimeout(() => {
        if (!!carousRef) carousRef.triggerRenderingHack();
      }, 1000);
    }
  }, [carouselWidth]);

  const formatValues = (value, isDividedBy = true) => {
    const dividend = isDividedBy ? Math.pow(10, 18) : 1;
    const dividedValue = value / dividend;
    if (value <= 0.01) {
      return !!value && value > 0 ? formatNumber(Number(value).toFixed(8)) : 0;
    }
    return formatNumber(Number(dividedValue.toFixed(2)));
  };

  const _renderItem = ({ item, index }) => {
    const stakeData = stakes.find(stake => stake.publicKey === item.publicKey);
    const isDeligate = stakeData && stakeData.isDeligate;
    if (!stakeData) {
      return null;
    }

    const availableToStake = item.balance;
    const currentDate = new Date();
    const nextSevenDays = currentDate.setDate(currentDate.getDate() + 7);
    const currentlyStaking = formatValues(stakeData.amount);
    const timeLeft =
      new Date().getTime() -
      (formatValues(stakeData.deactivatedTime || 0) + nextSevenDays);
    const isUnstaking = navigation.getParam("isUnstaking");
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
          ) : isUnstaking ? (
            <TouchableOpacity onPress={() => openWithdrawModal(true)}>
              <Text style={{ ...styles.bottomTextStyle }}>
                Withdraw {currentlyStaking} FTM now
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <Text style={{ ...styles.amountStyle }}>
            {formatValues(stakeData.pendingRewards, false)}
          </Text>
          <Text style={{ ...styles.walletTextStyle }}>Pending rewards</Text>
        </View>
        <View style={styles.buttonView}>
          {/* {availableToStake.isDeligate ? ( */}
          {isDeligate ? (
            <TouchableOpacity
              style={styles.buttonUnstakeView}
              // disabled={fa}
              onPress={() => {
                if (stakeData) setUnstakeKey(stakeData.publicKey);
                openUnstakingModal(true);
              }}
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

  //onUnstake Button
  const handleUnstakePress = () => {
    setIfUnstaking(true);
    const { navigation, delegateUnstake } = props;

    delegateUnstake({
      publicKey: unstakeKey,
      cbSuccess: () => {
        navigation.navigate("WalletImported", {
          text: "Requested to unstake successfully",
          navigationRoute: "Back"
        });
      }
    });
  };

  //onUnstake Button
  const handleWithdrawPress = () => {
    const { navigation } = props;
    // openWithdrawModal("");
    navigation.navigate("WalletImported", {
      text: "Tokens successfully withdrawn!",
      navigationRoute: "Staking"
    });
  };

  const handleStakeButton = () => {
    NavigationService.navigate(routes.root.ValidatorNode);
  };
  const withdrawText = `Withdraw ${isWithdrawModalOpened} FTM now`;
  let carousRef = React.createRef(null);
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
        {values && values.length === 1 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {_renderItem({ item: values[0], index: 0 })}
          </View>
        ) : (
          <Carousel
            ref={carouselRef => (carousRef = carouselRef)}
            data={values}
            shouldOptimizeUpdates={false}
            renderItem={_renderItem}
            sliderWidth={Metrics.screenWidth}
            itemWidth={carouselWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            extraData={carouselWidth !== 279}
          />
        )}
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
              textStyle: styles.backButton,
              disabled: ifUnstaking
            },
            {
              name: ifUnstaking ? "Unstaking..." : "Unstake",
              style: {
                ...styles.unstakeButton,
                backgroundColor: ifUnstaking ? Colors.grey : Colors.red
              },
              onPress: handleUnstakePress,
              textStyle: styles.unStakeText,
              disabled: ifUnstaking
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
  delegateByAddresses: delegateByAddressesAction,
  delegateUnstake: delegateUnstakeAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
