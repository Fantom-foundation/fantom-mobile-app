import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import Button from "../../../components/general/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import GridIcon from "../../../images/card-01.png";
import CardView from "./components/cardView";
import ListView from "./components/listView";

import StickyHeader from "./components/stickyHeader";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Carousel from "react-native-snap-carousel";
import { getHeight, getWidth } from "../../../utils/pixelResolver";
import { Colors, FontSize, fonts } from "../../../theme";
import WalletMenu from "./components/walletMenu";
import CardHeader from "./components/cardListHeader";
import { connect } from "react-redux";
import {
  getBalance as getBalanceAction,
  getHistory as getHistoryAction
} from "~/redux/wallet/actions";
import Loader from "~/components/general/Loader";

const rawData = [
  {
    cardTitle: "OrangeWallet",
    cardKey: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    totalBalance: 150,
    color: "orange",
    tokenType: "ETH",
    tokenPoint: 1.03,
    tokenBalance: 180.46,

    transactions: [
      {
        walletType: "Ethereum",
        cointType: "ETH",
        tokenPoint: 0.3,
        tokenBalance: 180.46,
        converionRate: 145.39
      },
      {
        walletType: "Fantom",
        cointType: "FTM",
        tokenPoint: 500,
        tokenBalance: 500,
        converionRate: 1
      }
    ]
  },
  {
    cardTitle: "My Fantom Wallet",
    cardKey: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    totalBalance: 150,
    color: "#cdd4d8",
    tokenType: "ETH",
    tokenPoint: 1.03,
    tokenBalance: 180.46,

    transactions: [
      {
        walletType: "Ethereum",
        cointType: "ETH",
        tokenPoint: 0.3,
        tokenBalance: 180.46,
        converionRate: 145.39
      },
      {
        walletType: "Fantom",
        cointType: "FTM",
        tokenPoint: 500,
        tokenBalance: 500,
        converionRate: 1
      }
    ]
  }
];

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListView: false,
      isHiddenText: false,
      activeSlide: 0,
      headerHeight: 1,
      isScaleView: 1
    };
    this.carousel = React.createRef();
  }
  componentDidMount() {
    const { getBalance, getHistory, isLoading, publicKey } = this.props;
 if (publicKey && !isLoading) {
   getBalance({ loading: isLoading });
   getHistory();
 }
  }

  changeView = isListView => {
    this.setState({ isListView, activeSlide: 0 });
  };
  setCardHiddenView = () => {
    const { isHiddenText } = this.state;
    this.setState({ isHiddenText: !isHiddenText });
  };

  render() {
    const {
      isListView,
      activeSlide,
      headerHeight,
      isScaleView,
      isHiddenText
    } = this.state;
    
    const { balance, publicKey, isLoading, history } = this.props;
    
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          {isLoading && (
            <Loader
              isLoading={isLoading}
              loaderStyle={0.25}
              loaderColor="#fff"
            />
          )}
          {isListView ? (
            <View>
              <CardHeader
                setCardHiddenView={this.setCardHiddenView}
                margin={22}
                isListView={isListView}
                changeView={this.changeView}
                showCard={false}
              />
              <ScrollView
                style={[
                  { height: getHeight(500), marginHorizontal: getWidth(22) }
                ]}
                showsVerticalScrollIndicator={false}
              >
                <FlatList
                  //  style={styles.listContainer}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeperatorStyle} />
                  )}
                  data={rawData}
                  renderItem={({ item }) => {
                    return <ListView data={item} />;
                  }}
                />
              </ScrollView>
            </View>
          ) : (
            <Carousel
              style={styles.listContainer}
              sliderWidth={Dimensions.get("window").width}
              ref={c => {
                this.carousel = c;
              }}
              contentContainerCustomStyle={{
                justifyContent: "center"
              }}
              onSnapToItem={index => {
                this.setState({ activeSlide: index });
              }}
              activeSlideOffset={20}
              inactiveSlideScale={isScaleView}
              lockScrollWhileSnapping={true}
              useScrollView={true}
              activeSlideAlignment={"center"}
              pagingEnabled={true}
              swipeThreshold={150}
              itemWidth={Dimensions.get("window").width - 40}
              renderItem={({ item, index }) => {
                return (
                  <ParallaxScrollView
                    onScroll={event => {
                      const threshold = 30;

                      if (
                        event.nativeEvent.contentOffset.y <= threshold &&
                        headerHeight > 1
                      ) {
                        this.setState({ headerHeight: 1, isScaleView: 1 });
                      } else if (
                        event.nativeEvent.contentOffset.y > threshold &&
                        headerHeight === 1
                      ) {
                        this.setState({ headerHeight: 220, isScaleView: 0 });
                      }
                    }}
                    isForegroundTouchable={true}
                    backgroundColor={Colors.white}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderHeight={getHeight(headerHeight)}
                    parallaxHeaderHeight={getHeight(444)}
                 
                    renderStickyHeader={() => (
                      <View style={styles.stickyHeaderContainer}>
                        <WalletMenu
                          isListView={isListView}
                          changeView={this.changeView}
                          customStyle={{
                            //marginBottom: getHeight(10),
                            marginVertical: getHeight(40)
                          }}
                        />
                        <StickyHeader data={item} />
                      </View>
                    )}
                    renderForeground={() => (
                      <View>
                        {index === activeSlide ? (
                          <CardHeader
                            margin={0}
                            setCardHiddenView={this.setCardHiddenView}
                            isListView={isListView}
                            changeView={this.changeView}
                            showCard={true}
                          >
                            <CardView
                              isHiddenText={isHiddenText}
                              data={item}
                              showCard={true}
                              showList={false}
                            />
                          </CardHeader>
                        ) : (
                          <View
                            style={{
                              height: getHeight(670),
                              justifyContent: "center"
                            }}
                          >
                            <CardView
                              isHiddenText={isHiddenText}
                              data={item}
                              showCard={true}
                              showList={false}
                            />
                          </View>
                        )}
                      </View>
                    )}
                  >
                    <ScrollView
                      style={styles.listScrollView}
                      showsVerticalScrollIndicator={false}
                    >
                      <CardView
                        isHiddenText={isHiddenText}
                        data={item}
                        showCard={false}
                        showList={index === activeSlide}
                      />
                    </ScrollView>
                  </ParallaxScrollView>
                );
              }}
              data={rawData}
            />
          )}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.keys.publicKey,
  balance: state.wallet.balance,
  isLoading: state.wallet.loading,
  history: state.wallet.history
});

const mapDispatchToProps = {
  getBalance: getBalanceAction,
  getHistory: getHistoryAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
