import React, { Component } from "react";
import { View, WebView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "./style";
import Button from "../../components/general/Button";
import { Colors } from "../../theme";
export default class VerifyRecoveryWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      selectedWords: [],
      mnemonicWords: [],
      realWord: []
    };
  }
  componentDidMount() {
    const { navigation } = this.props;

    //navigation.getParam('seed', 'NO-ID'),
    const mnemonicWords = navigation.getParam("mnemonicWords", "NO-ID");
    this.setState({ mnemonicWords, realWord: mnemonicWords });
  }
  handleWordClick = selected => {
    
    const { selectedWords, mnemonicWords, realWord } = this.state;
    let newWords = selectedWords;
    let remainingWords = mnemonicWords;
    const index = remainingWords.findIndex(item => item === selected);
    remainingWords.splice(index, 1);
    newWords.push(selected);
    this.setState({ selectedWords: newWords, mnemonicWords: remainingWords });
    if (selectedWords.length === realWord.length) {
      this.setState({ isEnable: true });
    } else {
      this.setState({ isEnable: false });
    }
  };

   handleSelectedWordClick = selected => {
    
    const { selectedWords, mnemonicWords, realWord } = this.state;
    let newWords = mnemonicWords;
    let remainingWords = selectedWords;
    const index = remainingWords.findIndex(item => item === selected);
    remainingWords.splice(index, 1);
    newWords.push(selected);
    this.setState({
      selectedWords: remainingWords,
      mnemonicWords: newWords
    });

  };

  render() {
    const { isEnable, selectedWords, mnemonicWords } = this.state;

    return (
      <View style={styles.mainContainerStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar barStyle="light-content" /> */}
          <View style={{ flex: 0.5 }}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Verify recovery words</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                Tap the words to put them in the
              </Text>
              <Text style={styles.subHeading}> correct order.</Text>
            </View>
            <View>
              <View
                style={{
                  ...styles.verfiyContainer,
                  borderColor: !isEnable ? "transparent" : Colors.red
                }}
              >
                <View style={styles.textContainer}>
                  {selectedWords && selectedWords.length ? (
                    selectedWords.map((val, i) => {
                      return (
                        <View key={i} style={styles.wordWrap}>
                          <Text
                            onPress={() => this.handleSelectedWordClick(val)}
                            style={styles.selectedTextView}
                          >
                            {val}
                          </Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text style={styles.selectedTextView} />
                  )}
                </View>
                {!isEnable && (
                  <Text style={styles.errorText}>
                    Incorrect order. Try again!
                  </Text>
                )}
              </View>
            </View>

            {/* <View style={styles.flex1}> */}
            <View style={styles.textContainer}>
              {mnemonicWords && mnemonicWords.length ? (
                mnemonicWords.map((val, i) => {
                  return (
                    <View key={i} style={styles.wordWrap}>
                      <Text
                        onPress={() => this.handleWordClick(val)}
                        style={styles.selectedTextView}
                      >
                        {val}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.selectedTextView} />
              )}
            </View>

            {/* <View style={{ flex: 0.5 }}> */}
            <Button
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: isEnable
                  ? Colors.royalBlue
                  : Colors.greyOpacity
              }}
              onPress={() =>
                this.props.navigation.navigate("WalletCreated")
              }
              textStyle={styles.buttonText}
              text={"CONTINUE"}
            />
            {/* </View> */}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
