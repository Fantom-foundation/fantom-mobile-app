// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";

import { NavigationService, routes } from "~/navigation/helpers";
import { generateWallet as generateWalletAction } from "~/redux/keys/actions";
import Button from "~/components/general/Button";
import ProgressBar from "~/components/general/ProgressBar";
import { setDopdownAlert as setDopdownAlertAction } from "~/redux/notification/actions";
import WordItem from "./WordItem";
import styles from "./styles";
import BackgroundFantomIcon from "~/images/BackgroundIcon.png";
import { DEVICE_HEIGHT } from "~/common/constants";
import { ENUM_WORD } from "./helpers";
import { Colors } from "../../../theme";
import { Loader } from "~/components/loader";
import { Messages } from "../../../theme";

type ShuffleItem = {
  name: string,
  index: string,
  isClickable: boolean
};

type Props = {
  mnemonic: string,
  navigation: any,
  generateWallet: ({
    mnemonic: string,
    cb: (publicKey: string) => void
  }) => any,
  setDopdownAlert: (string, string, { [string]: string }) => void
};

/**
 * This component is designed to check recorded phrases.
 */
export const CheckMnemonicContainer = ({
  navigation,
  generateWallet,
  setDopdownAlert,
  mnemonic
}: Props) => {
  const [shuffledMnemonics, setShuffledMnemonic] = useState<Array<ShuffleItem>>(
    []
  );
  const [verifyMnemonic, setVerifyMnemonic] = useState([]);
  const [isEnable, setEnable] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [mnemonicWords, setMnemonicWords] = useState([]);
  const [realWord, setRealWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShuffledMnemonic(
      mnemonic
        .split(" ")
        .sort(() => Math.random() - 0.5)
        .map((word, index) => ({
          name: word,
          index: `${word}_${index}`,
          isClickable: true
        }))
    );
  }, []);

  useEffect(() => {
    if (verifyMnemonic && verifyMnemonic.length > 0) {
      let inconsistency = false;

      const verifyMnemonicArr = verifyMnemonic.map(obj =>
        obj.name.toLowerCase()
      );
      const mnemonicString = mnemonic
        .split(" ")
        .slice(0, verifyMnemonicArr.length)
        .join();

      if (mnemonicString === verifyMnemonicArr.join()) setEnable(false);
      else setEnable(true);
      return;
    }
    setEnable(false);
  }, [verifyMnemonic]);

  const handleVerify = () => {
    if (verifyMnemonic && verifyMnemonic.length === 0) {
      return;
    }
    let inconsistency = false;

    const verifyMnemonicArr = verifyMnemonic.map(obj => obj.name.toLowerCase());

    mnemonic.split(" ").some((word, index) => {
      if (word === verifyMnemonicArr[index]) return false;
      inconsistency = ENUM_WORD[index];
      return true;
    });

    if (inconsistency) {
      return;
    }
    setIsLoading(true);
    generateWallet({
      mnemonic,
      cb: (publicKey: string) => {
        setIsLoading(false);
        NavigationService.navigate(routes.root.WalletCreated, { publicKey });
      }
    });
  };

  const select = ({ name, index }) => () => {
    setVerifyMnemonic([
      ...verifyMnemonic.slice(),
      { name, index, isClickable: false }
    ]);

    setShuffledMnemonic(
      shuffledMnemonics.map(item => ({
        ...item,
        isClickable: item.index !== index ? item.isClickable : false
      }))
    );
  };

  const unSelect = ({ name, index }) => () => {
    setVerifyMnemonic(verifyMnemonic.filter(word => word.index !== index));
    setShuffledMnemonic(
      shuffledMnemonics.map(word => ({
        ...word,
        ...(name === word.name ? { isClickable: true } : {})
      }))
    );
  };

  const behaviour = Platform.OS === "ios" ? "padding" : null;
  return (
    <View style={styles.mainContainerStyle}>
      {isLoading && <Loader />}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <View style={styles.mainHeadingContainer}>
            <Text style={styles.mainHeading}>
              {Messages.verifyRecoveryWords}
            </Text>
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>{Messages.correctOrderText}</Text>
          </View>
          <View>
            <View
              style={{
                ...styles.verfiyContainer,
                borderColor: isEnable ? Colors.red : "transparent"
              }}
            >
              <View style={styles.textContainer}>
                {verifyMnemonic.map(val => (
                  <WordItem {...val} key={val.index} onClick={unSelect} isTop />
                ))}
              </View>
              {isEnable && (
                <Text style={styles.errorText}>{Messages.incorrectOrder}</Text>
              )}
            </View>
          </View>

          <View style={styles.textContainer}>
            {shuffledMnemonics.map(item => {
              if (item.isClickable)
                return <WordItem {...item} key={item.index} onClick={select} />;
            })}
          </View>

          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor:
                !isEnable && verifyMnemonic.length === 12
                  ? Colors.royalBlue
                  : Colors.greyOpacity
            }}
            disable={!isEnable && verifyMnemonic.length === 12}
            onPress={handleVerify}
            textStyle={styles.buttonText}
            text={Messages.continue}
          />
          <View style={{ height: 40 }}></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default connect(
  state => ({
    mnemonic: state.keys.mnemonic
  }),
  {
    generateWallet: generateWalletAction,
    setDopdownAlert: setDopdownAlertAction
  }
)(CheckMnemonicContainer);
