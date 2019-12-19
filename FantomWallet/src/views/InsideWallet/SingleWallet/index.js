import React from "react";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Modal,
  StatusBar
} from "react-native";
import { Colors } from "~/theme";
import { getHeight, Metrics } from "~/utils/pixelResolver";
import { NavigationService, routes } from "~/navigation/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "~/components/general/Button";
import styles from "./styles";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "~/common/constants";

const colorTheme = Colors.royalBlue; // Color theme can be 16 color palette themes
const walletID = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
const ftm = "43,680 FTM";
const amount = 567.84;
let activity = [
  {
    date: "Oct 28, 2019 11:23PM",
    amount: "-22,418",
    type: "Send"
  },
  {
    date: "Dec 10, 2019 09:44AM",
    amount: "-211,650",
    type: "Send"
  },
  {
    date: "Dec 11, 2019 12:16PM",
    amount: "3,680",
    type: "Receive"
  },
  {
    date: "Oct 20, 2019 04:42AM",
    amount: "230,001",
    type: "Receive"
  },
  {
    date: "Oct 20, 2019 04:42AM",
    amount: "21,312",
    type: "Receive"
  },
  {
    date: "Oct 20, 2019 04:40AM",
    amount: "33,200",
    type: "Receive"
  },
  {
    date: "Oct 12, 2019 10:12PM",
    amount: "-43,203",
    type: "Send"
  }
];
const receiveTransaction = {
  ftm: 3680,
  senderId: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
  transactionNumber:
    "0x7485a8be8324ba03553a40f1f9d4503c1bed5793cd2467ae1801c7a43ace960a",
  date: "November 16 2019, 12:16 PM"
};
const sendTransaction = {
  hot: "209,538",
  recipientId: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
  transactionNumber:
    "0x7485a8be8324ba03553a40f1f9d4503c1bed5793cd2467ae1801c7a43ace960a",
  date: "November 16 2019, 11:11 AM",
  transactionFee: "0.001585839 FTM ($0.30)"
};

export default class SingleWallet extends React.Component<any, any> {
  state = {
    walletTitle: "My Fantom Wallet",
    textColor: Colors.white,
    showReceiveModal: false,
    showSendModal: false
  };

  componentDidMount() {
    if (colorTheme === "#fe9d8b")
      this.setState({
        walletTitle: "Orange Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#e6fc88")
      this.setState({
        walletTitle: "Yellow Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#59C5DD")
      this.setState({
        walletTitle: "Aqua Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#FCD3FF")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#FFF666")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#40C49D")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#8959DD")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.white
      });
    if (colorTheme === "#FFB966")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#A650A6")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.white
      });
    if (colorTheme === "#78DD59")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#4649FD")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.white
      });
    if (colorTheme === "#7BC5FF")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.textBlack
      });
    if (colorTheme === "#E32C2C")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.white
      });
    if (colorTheme === "#5F5F7C")
      this.setState({
        walletTitle: "My Fantom Wallet",
        textColor: Colors.white
      });
    if (colorTheme === "#CDD4D8")
      this.setState({
        walletTitle: "Grey Wallet",
        textColor: Colors.textBlack
      });
  }

  render() {
    const {
      walletTitle,
      textColor,
      showReceiveModal,
      showSendModal
    } = this.state;
    activity = this.sortActivities(activity);
    return (
      <View style={styles.containerStyle}>
        <StatusBar
          barStyle={
            colorTheme === Colors.royalBlue ||
            colorTheme === "#8959DD" ||
            colorTheme === "#A650A6" ||
            colorTheme === "#4649FD" ||
            colorTheme === "#E32C2C" ||
            colorTheme === "#5F5F7C"
              ? "light-content"
              : "dark-content"
          }
        />
        <View
          style={{ backgroundColor: colorTheme, ...styles.colorThemeBox }}
        />
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
              {walletTitle}
            </Text>
            <View style={styles.walletIDWrapper}>
              <Text
                style={{
                  color: textColor,
                  ...styles.walletID
                }}
              >
                {walletID}
              </Text>
              <TouchableOpacity>
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
              <TouchableOpacity>
                <MaterialCommunityIcons
                  style={styles.lineOnEye}
                  name="eye-off-outline"
                  size={18}
                  color="rgb(96, 106, 125)"
                />
              </TouchableOpacity>
              <Text style={styles.ftmText}>{ftm}</Text>
              <Text style={styles.amountText}>{`($${amount})`}</Text>
              <View style={styles.buttonWrapper}>
                <Button
                  activeOpacity={0.5}
                  text="Receive"
                  onPress={() =>
                    NavigationService.navigate(routes.root.ReceiveMyQcCode)
                  }
                  buttonStyle={{
                    backgroundColor: this.hexToRGB(colorTheme, 0.1),
                    ...styles.buttonStyle
                  }}
                  textStyle={{ ...styles.textStyle, opacity: 2 }}
                />
                <Button
                  activeOpacity={0.5}
                  text="Send"
                  onPress={() =>
                    NavigationService.navigate(routes.root.SendFTM)
                  }
                  buttonStyle={{
                    backgroundColor: this.hexToRGB(colorTheme, 0.1),
                    ...styles.buttonStyle
                  }}
                  textStyle={styles.textStyle}
                />
              </View>
              <View style={styles.activityListWrapper}>
                {activity.length > 0 && (
                  <Text style={styles.activityText}>ACTIVITY</Text>
                )}
                <View style={styles.activityListView}>
                  <FlatList
                    data={activity}
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
                      const newDate = this.formatActivities(item.date);
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            if (item.type === "Send") {
                                this.setState({ showSendModal: true });
                            } else {
                              this.setState({ showReceiveModal: true });
                            }
                          }}
                          style={{
                            ...styles.listWrapper,
                            marginTop: index === 0 ? 0 : getHeight(32)
                          }}
                        >
                          <Text style={styles.dateText}>{newDate}</Text>
                          <Text style={styles.activityAmountText}>
                            {item.amount}
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
            onRequestClose={() => this.setState({ showReceiveModal: false })}
          >
            {this.receiveModal()}
          </Modal>
          <Modal
            transparent
            visible={showSendModal}
            style={styles.modalStyle}
            onRequestClose={() => this.setState({ showSendModal: false })}
          >
            {this.sendModal()}
          </Modal>
        </SafeAreaView>
      </View>
    );
  }

  sortActivities = (activityObject: any) => {
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
  };

  formatActivities = (activityDate: any) => {
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

  hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  receiveModal = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({ showReceiveModal: false })}
        style={styles.modalBackground}
      >
        <TouchableOpacity
          activeOpacity={1}
          //   onPress={() => NavigationService.navigate(routes.root.ReceiveMyQcCode)}
          style={styles.modalShadow}
        >
          <View style={styles.modalWrapper}>
            <View
              style={{ ...styles.themeStripe, backgroundColor: colorTheme }}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.modalText}>You received</Text>
              <Text style={styles.modalAmount}>
                {`${receiveTransaction.ftm} FTM`}
              </Text>
              <Text style={styles.modalTransaction}>Sender</Text>
              <Text style={styles.modalTransactionText}>
                {receiveTransaction.senderId}
              </Text>
              <Text style={styles.modalTransaction}>Transaction number</Text>
              <Text style={styles.modalTransactionText}>
                {receiveTransaction.transactionNumber}
              </Text>
              <Text style={styles.modalTransaction}>Date</Text>
              <Text
                style={{
                  ...styles.modalTransactionText,
                  marginBottom: getHeight(40)
                }}
              >
                {receiveTransaction.date}
              </Text>
              <TouchableOpacity style={styles.shareIconWrapper}>
                <Entypo
                  style={styles.shareIcon}
                  name="share"
                  size={20}
                  color={Colors.textBlack}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  sendModal = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({ showSendModal: false })}
        style={styles.modalBackground}
      >
        <TouchableOpacity
          activeOpacity={1}
          //  onPress={() => NavigationService.navigate(routes.root.SendFTM)}
          style={styles.modalShadow}
        >
          <View style={styles.modalWrapper}>
            <View
              style={{
                ...styles.themeStripe,
                backgroundColor: colorTheme
              }}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.modalText}>You sent</Text>
              <Text style={styles.modalAmount}>
                {`${sendTransaction.hot} FTM`}
              </Text>
              <Text style={styles.modalTransaction}>Recipient</Text>
              <Text style={styles.modalTransactionText}>
                {sendTransaction.recipientId}
              </Text>
              <Text style={styles.modalTransaction}>Transaction number</Text>
              <Text style={styles.modalTransactionText}>
                {sendTransaction.transactionNumber}
              </Text>
              <Text style={styles.modalTransaction}>Date</Text>
              <Text style={styles.modalTransactionText}>
                {sendTransaction.date}
              </Text>
              <Text style={styles.modalTransaction}>Transaction fee</Text>
              <Text
                style={{
                  ...styles.modalTransactionText,
                  marginBottom: getHeight(40)
                }}
              >
                {sendTransaction.transactionFee}
              </Text>
              <TouchableOpacity style={styles.shareIconWrapper}>
                <Entypo
                  style={styles.shareIcon}
                  name="share"
                  size={20}
                  color={Colors.textBlack}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
}
