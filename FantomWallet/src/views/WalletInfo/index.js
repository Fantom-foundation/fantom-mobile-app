import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../theme/colors';
import ModalView from 'react-native-modalbox';
import { getWidth, Metrics, getHeight } from '../../utils/pixelResolver';
class WalletInfo extends Component {
  state = {
    renameIconPressed: false,
    walletName: '',
    modalVisible: false
  };
  renameWallet = () => {
    const { renameIconPressed } = this.state;
    this.setState({
      renameIconPressed: !renameIconPressed
    });
  };
  render() {
    const { renameIconPressed, walletName, modalVisible } = this.state;
    const colors = ['#416ed5', '#fe9d8b', '#59c5dd', '#cdd4d8', '#e6fc88', '#fcd3ff', '#fff666', '#7bc5ff', '#40c49d', '#8959dd',
    '#ffb966','#e32c2c','#a650a6','#78dd59','#4649fd','#5f5f7c'];
    const arrayOfColors = [1, 2, 3, 4];
    let colorIndex = -1;
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Wallet info</Text>
          </View>
          <Text style={styles.addressText}>Address</Text>
          <View style={styles.codeView}>
            <Text style={styles.codeText}>
              0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
            </Text>
            <TouchableOpacity>
              <Ionicons name="ios-copy" size={16} color={Colors.textBlack} />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>Name</Text>
          <View style={styles.codeView}>
            {renameIconPressed ? (
              <TextInput
                style={styles.textInput}
                onChangeText={value => this.setState({ walletName: value })}
              />
            ) : (
              <Text style={styles.codeText}>
                {walletName ? walletName : 'My Fantom Wallet'}
              </Text>
            )}
            <TouchableOpacity onPress={() => this.renameWallet()}>
              {walletName !== '' ? (
                <Feather
                  name="check"
                  size={20}
                  color={Colors.textBlack}
                ></Feather>
              ) : (
                <EvilIcons name="pencil" size={20} color={Colors.textBlack} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>Color</Text>
          <View style={styles.codeView}>
            <Text style={styles.codeText}>Choose the color</Text>
            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: !modalVisible })}
            >
              <EvilIcons name="pencil" size={20} color={Colors.textBlack} />
            </TouchableOpacity>
          </View>
          <ModalView
            backdrop={false}
            style={styles.modalStyle}
            position="up"
            isOpen={modalVisible}
            onClosed={() => this.setState({ modalVisible: false })}
          >

                    <View style={{marginHorizontal: 30}}>
                    <Text style={styles.codeText}>Select a color</Text>
              {arrayOfColors.map(item => {
                return (
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    {arrayOfColors.map((item, index) => {
                      colorIndex += 1;
                      return (
                        <TouchableOpacity
                          style={{
                            width: getWidth(50),
                            height: getWidth(50),
                            borderRadius: getWidth(25),
                            backgroundColor: colors[colorIndex]
                              }}
                              />
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </ModalView>
        </SafeAreaView>
      </View>
    );
  }
}

export default WalletInfo;
