import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Modal,
  StatusBar,
  Clipboard,
  Image
} from "react-native";
import { Colors } from "~/theme";
import { connect } from "react-redux";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import styles from "./styles";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "~/common/constants";
import ReceiveModal from "./components/ReceiveModal";
import SendModal from "./components/SendModal";
import { EyeIcon, EyeOffIcon } from "../../../images";
const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes

const SingleWallet = props => {
  const { currentWallet } = props;
  const [textColor, setTextColor] = useState(Colors.white);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [clipBoardContent, setClipboardText] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isHiddenText, setCardHiddenView] = useState(false);

  const writeToClipboard = () => {
    const { currentWallet } = props;
    //To copy the text to clipboard
    Clipboard.setString(currentWallet.publicKey);
    alert("Copied to Clipboard!");
  };

  const sortActivities = (activityObject: any) => {
    if (!!activityObject) {
      return activityObject.sort((a, b) => {
        if (
          moment(a.date, "MMM DD, YYYY hh:mmA") <
          moment(b.date, "MMM DD, YYYY hh:mmA")
        )
          return 1;
        if (
          moment(a.date, "MMM DD, YYYY hh:mmA") >
          moment(b.date, "MMM DD, YYYY hh:mmA")
        )
          return -1;
        return 0;
      });
    }
  };
  const formatActivities = (activityDate: any) => {
    if (moment(activityDate, "MMM DD, YYYY hh:mmA").diff(moment(), "day") === 0)
      return "Today, ".concat(
        moment(activityDate, "MMM DD, YYYY hh:mmA").format("hh:mm A")
      );
    if (
      moment(activityDate, "MMM DD, YYYY hh:mmA").diff(moment(), "day") === -1
    )
      return "Yesterday, ".concat(
        moment(activityDate, "MMM DD, YYYY hh:mmA").format("hh:mm A")
      );
    return moment(activityDate, "MMM DD, YYYY hh:mmA").format(
      "MMM DD, hh:mm A"
    );
  };
  const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  const readFromClipboard = async () => {
    await Clipboard.getString()
      .then(clipBoardText => {
        setClipboardText(clipBoardText);
        // console.log('****Text is',clipBoardText)
      })
      .catch(err => console.error("error: " + err));
  };

  const history = sortActivities(currentWallet.history);
  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: colorTheme, ...styles.colorThemeBox }} />
      <SafeAreaView
        style={{
          ...styles.safeAreaView,
          marginBottom:
            Metrics.getiPhoneX_Dimensions().height === DEVICE_HEIGHT &&
            Metrics.getiPhoneX_Dimensions().width === DEVICE_WIDTH
              ? getHeight(60)
              : getHeight(48)
        }}
      >
        <View style={styles.safeAreaViewContainer}>
          <Text style={{ ...styles.walletTitle, color: textColor }}>
            {currentWallet && currentWallet.name ? currentWallet.name : ""}
          </Text>
          <View style={styles.walletIDWrapper}>
            <Text
              style={{
                color: textColor,
                ...styles.walletID
              }}
            >
              {currentWallet && currentWallet.publicKey
                ? currentWallet.publicKey
                : ""}
            </Text>
            <TouchableOpacity onPress={writeToClipboard}>
              <Ionicons
                style={styles.copyIcon}
                name="md-copy"
                size={16}
                color={textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activityContainer}>
          <View style={styles.activityWrapper}>
            <TouchableOpacity onPress={() => setCardHiddenView(!isHiddenText)}>
              {/* <MaterialCommunityIcons
                style={styles.lineOnEye}
                name="eye-off-outline"
                size={18}
                color="rgb(96, 106, 125)"
              /> */}

              {isHiddenText ? (
                <Image
                  source={EyeOffIcon}
                  resizeMode="contain"
                  style={styles.lineOnEyeOff}
                ></Image>
              ) : (
                <Image
                  source={EyeIcon}
                  resizeMode="contain"
                  style={styles.lineOnEye}
                ></Image>
              )}
            </TouchableOpacity>
            <Text style={styles.ftmText}>
              {!isHiddenText
                ? currentWallet && currentWallet.balance
                  ? currentWallet.balance
                  : 0
                : "*******"}
            </Text>
            <Text style={styles.amountText}>
              {!isHiddenText
                ? `($${
                    currentWallet && currentWallet.balance
                      ? currentWallet.balance
                      : 0
                  })`
                : "*******"}
            </Text>
            <View style={styles.buttonWrapper}>
              <Button
                activeOpacity={0.5}
                text="Receive"
                onPress={() =>
                  NavigationService.navigate(routes.root.ReceiveMyQcCode, {
                    publicKey: currentWallet.publicKey
                  })
                }
                buttonStyle={{
                  backgroundColor: hexToRGB(colorTheme, 0.1),
                  ...styles.buttonStyle
                }}
                textStyle={{ ...styles.textStyle, opacity: 2 }}
              />
              <Button
                activeOpacity={0.5}
                text="Send"
                onPress={() => {
                  readFromClipboard();
                  NavigationService.navigate(routes.root.SendFTM, {
                    publicKey: currentWallet.publicKey
                  });
                }}
                buttonStyle={{
                  backgroundColor: hexToRGB(colorTheme, 0.1),
                  ...styles.buttonStyle
                }}
                textStyle={styles.textStyle}
              />
            </View>
            <View style={styles.activityListWrapper}>
              {history.length > 0 && (
                <Text style={styles.activityText}>ACTIVITY</Text>
              )}
              <View style={styles.activityListView}>
                <FlatList
                  data={history || []}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  horizontal={false}
                  scrollEnabled
                  ListEmptyComponent={
                    <View style={styles.emptyListWrapper}>
                      <Text style={styles.emptyListText}>
                        Your transactions will appear here!
                      </Text>
                      <Ionicons
                        name="ios-rocket"
                        size={90}
                        color={colorTheme}
                      />
                    </View>
                  }
                  renderItem={({ item, index }) => {
                    const newDate = formatActivities(item.date);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (item.type === "Sent") {
                            setTransactionData(item);
                            setShowSendModal(true);
                          } else {
                            setTransactionData(item);
                            setShowReceiveModal(true);
                          }
                        }}
                        style={{
                          ...styles.listWrapper,
                          marginTop: index === 0 ? 0 : getHeight(32)
                        }}
                      >
                        <Text style={styles.dateText}>
                          {isHiddenText ? "*******" : newDate}
                        </Text>
                        <Text style={styles.activityAmountText}>
                          {isHiddenText
                            ? "*"
                            : item.type === "Sent"
                            ? "-"
                            : "+"}
                          {isHiddenText ? "******" : item.amount}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <Modal
          transparent
          visible={showReceiveModal}
          style={styles.modalStyle}
          onRequestClose={() => setShowReceiveModal(false)}
        >
          <ReceiveModal
            transactionData={transactionData}
            showReceiveModal={showReceiveModal}
            closeReceiveModal={() => setShowReceiveModal(false)}
          />
        </Modal>
        <Modal
          transparent
          visible={showSendModal}
          style={styles.modalStyle}
          onRequestClose={() => setShowSendModal(false)}
        >
          <SendModal
            transactionData={transactionData}
            showSendModal={showSendModal}
            closeSendModal={() => setShowSendModal(false)}
          />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  currentWallet: state.wallet.currentWallet
});

export default connect(mapStateToProps, null)(SingleWallet);
