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
  Image,
  PermissionsAndroid
} from "react-native";
import { Colors } from "~/theme";
import { connect } from "react-redux";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import Button from "~/components/general/Button";
import styles from "./styles";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "~/common/constants";
import ReceiveModal from "./components/ReceiveModal";
import SendModal from "./components/SendModal";
import { EyeOpen, EyeClose } from "../../../images";
import { Messages } from "../../../theme";
import {
  balanceToDollar,
  convertFTMValue,
  getConversionRate,
  formatActivities,
  balanceWithSeprators
} from "~/utils/converts";
import keythereum from 'keythereum';
import crypto from 'crypto';
import RNFS from 'react-native-fs';

import { setDopdownAlert as setDopdownAlertAction } from "../../../redux/notification/actions";

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes

const SingleWallet = props => {
  const { currentWallet, walletsKeys, setDopdownAlert } = props;
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
    setDopdownAlert("custom", Messages.copied);
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
      })
      .catch(err => console.error("error: " + err));
  };

  const exportKey = async () => {
    const wallet = walletsKeys.find(w => w.publicKey === currentWallet.publicKey);
    if (!wallet) {
      alert('Private key not found');
      return;
    }

    const password = "123456";
    const iv = crypto.randomBytes(16); // ivBytes
    const salt = crypto.randomBytes(32); // keyBytes
    const privateKey = wallet.privateKey.slice(2).toLowerCase();

    let key = await keythereum.dump(password, privateKey, salt, iv, null);

    try {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } catch (err) {
        alert(err);
      }
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if(!readGranted || !writeGranted) {
        console.log('Read and write permissions have not been granted');
        return;
      }

      // RNFS.DownloadDirectoryPath
      const path = '/sdcard/' + currentWallet.name + '.json';
      await RNFS.writeFile(path, JSON.stringify(key), 'utf8');

      alert('Saved into ' + path);
    } catch (e) {
      alert(e);
    }
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
              ? getHeight(86)
              : getHeight(48)
        }}
      >
        <View style={styles.safeAreaViewContainer}>
          <Text
            numberOfLines={1}
            style={{ ...styles.walletTitle, color: textColor }}
          >
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
                size={22}
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
                  source={EyeClose}
                  resizeMode="contain"
                  style={styles.lineOnEyeOff}
                ></Image>
              ) : (
                <Image
                  source={EyeOpen}
                  resizeMode="contain"
                  style={styles.lineOnEye}
                ></Image>
              )}
            </TouchableOpacity>
            <Text style={styles.ftmText}>
              {!isHiddenText
                ? currentWallet && currentWallet.balance
                  ? balanceWithSeprators(currentWallet.balance)
                  : 0
                : "*******"}
            </Text>
            <Text style={styles.amountText}>
              {!isHiddenText
                ? `($${
                    currentWallet && currentWallet.balance
                      ? balanceToDollar(currentWallet.balance, 2)
                      : 0
                  })`
                : "*******"}
            </Text>
            <View style={styles.buttonWrapper}>
              <Button
                activeOpacity={0.5}
                text={Messages.receive}
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
                text={Messages.send}
                onPress={() => {
                  readFromClipboard();
                  NavigationService.navigate(routes.root.SendFTM);
                }}
                buttonStyle={{
                  backgroundColor: hexToRGB(colorTheme, 0.1),
                  ...styles.buttonStyle
                }}
                textStyle={styles.textStyle}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                  activeOpacity={0.5}
                  text={Messages.exportKey}
                  onPress={() =>
                      exportKey()
                  }
                  buttonStyle={{
                    backgroundColor: hexToRGB(colorTheme, 0.1),
                    ...styles.buttonStyle
                  }}
                  textStyle={{ ...styles.textStyle, opacity: 2 }}
              />
            </View>
            <View style={styles.activityListWrapper}>
              {history && history.length > 0 && (
                <Text style={styles.activityText}>
                  {Messages.recentActivity}
                </Text>
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
                    const type =
                      item.from.toLowerCase() ===
                      currentWallet.publicKey.toLowerCase()
                        ? "Sent"
                        : "Received";

                    const newDate = formatActivities(item.timestamp);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (type === "Sent") {
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
                          {item.from.toLowerCase() !== item.to.toLowerCase()
                            ? isHiddenText
                              ? "*"
                              : type === "Sent"
                              ? "-"
                              : "+"
                            : ""}
                          {isHiddenText
                            ? "******"
                            : `${Number(
                                convertFTMValue(item.value, "bignumber")
                              )} FTM`}
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
            publicKey={currentWallet.publicKey}
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
            publicKey={currentWallet.publicKey}
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
  currentWallet: state.wallet.currentWallet,
  walletsKeys: state.keys.wallets,
});
const mapDispatchToProps = {
  setDopdownAlert: setDopdownAlertAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleWallet);
