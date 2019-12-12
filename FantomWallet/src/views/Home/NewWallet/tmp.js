import React, { Component } from "react";
import {
  View,
  WebView,
  StatusBar,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import Button from "../../../components/general/Button";
import { Colors } from "../../../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import CardImage from "../../../images/Binance_logo.png";
import GridIcon from "../../../images/card-01.png";
import CardView from "./components/cardView";
import ListView from "./components/listView";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Carousel from "react-native-snap-carousel";
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListView: false,
      activeSlide: 0
    };
    this.carousel = React.createRef();
  }

  render() {
    const { isListView, activeSlide } = this.state;
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />

          {/* <View style={styles.headerContainer}>
            <View style={styles.headerItems}>
              <Text style={styles.headerText}>$0</Text>
              <Icon
                style={styles.iconStyle}
                name={"eye"}
                size={18}
                color={Colors.grey}
              />
            </View>
            <Text style={styles.subHeading}>Total balance</Text>
          </View>
          <View style={styles.listHeader}>
            <Text style={styles.headerText}>Wallets</Text>
            {isListView ? (
              <TouchableOpacity
                //style={styles.iconStyle}
                style={{
                  top: 6,
                  justifyContent: "center",
                  alignSelf: "center"
                }}
                onPress={() => this.setState({ isListView: !isListView })}
              >
                <Image
                  // style={styles.iconStyle}
                  height={16}
                  width={16}
                  source={GridIcon}
                ></Image>
              </TouchableOpacity>
            ) : (
              <Icon
                onPress={() => this.setState({ isListView: !isListView })}
                style={styles.iconStyle}
                name={isListView ? "list-ol" : "list-ul"}
                size={16}
                color={Colors.grey}
              />
            )}
          </View> */}
          {isListView ? (
            <FlatList
              style={styles.listContainer}
              // removeClippedSubviews={true}
              // inactiveSlideShift={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeperatorStyle} />
              )}
              data={[1, 2, 3, 4]}
              renderItem={({ item }) => {
                return (
                  <ScrollView
                    style={styles.listScrollView}
                    showsVerticalScrollIndicator={false}
                  >
                    <ListView />
                  </ScrollView>
                );
              }}
            />
          ) : (
            // <FlatList
            //   style={styles.listContainer}
            //   removeClippedSubviews={true}
            //   showsHorizontalScrollIndicator={false}
            //   showsVerticalScrollIndicator={false}
            //   horizontal
            //   ItemSeparatorComponent={() => (
            //     <View style={styles.itemSeperatorStyle} />
            //   )}
            //   data={[1, 2, 3, 4]}
            //   renderItem={({ item }) => {
            //     return (
            //       <ScrollView
            //         style={styles.listScrollView}
            //         showsVerticalScrollIndicator={false}
            //       >
            //         <CardView />
            //       </ScrollView>
            //     );
            //   }}
            // />

            <Carousel
              style={styles.listContainer}
              sliderWidth={380}
              ref={c => {
                this.carousel = c;
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                //  backgroundColor: "red",
                height: 380
              }}
              activeSlideOffset={20}
              inactiveSlideScale={1}
              lockScrollWhileSnapping={true}
              useScrollView={true}
              activeSlideAlignment={"center"}
              pagingEnabled={true}
              onBeforeSnapToItem={index => {
                this.setState({ activeSlide: index });
              }}
              // layoutCardOffset={50}
              itemWidth={340}
              renderItem={({ item, index }) => {
                // return (
                //   <ScrollView
                //     style={styles.listScrollView}
                //     showsVerticalScrollIndicator={false}
                //   >
                //     <CardView showList={index === activeSlide} />
                //   </ScrollView>
                // );

                return (
                  <ParallaxScrollView
                    onChangeHeaderVisibility={isVisible => {
                      console.log("hello", isVisible);
                    }}
                    backgroundColor="white"
                    // contentBackgroundColor="pink"
                    stickyHeaderHeight={80}
                    parallaxHeaderHeight={180}
                    renderStickyHeader={() => (
                      <View style={{ height: 80, backgroundColor: "red" }}>
                        <Text style={{ color: "white" }}>Hello World</Text>
                      </View>
                    )}
                    renderForeground={() => (
                      <CardView showCard={true} showList={false} />
                    )}
                  >
                    <ScrollView
                      style={styles.listScrollView}
                      showsVerticalScrollIndicator={false}
                    >
                      <CardView showCard={false} showList={false} />
                    </ScrollView>
                    <CardView
                      showCard={false}
                      showList={index === activeSlide}
                    />
                  </ParallaxScrollView>
                );
              }}
              data={[1, 2, 3, 4]}
            />
          )}
        </SafeAreaView>
      </View>
    );
  }
}
