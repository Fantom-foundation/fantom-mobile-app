import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Picker
} from 'react-native';
import styles from './styles';
import { CrossIcon, EqualIcon } from '../../../images';
import { Colors, fonts, FontSize } from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalView from 'react-native-modalbox';
import { Dropdown } from 'react-native-material-dropdown';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants';
import { Metrics, getHeight, getWidth } from '../../../utils/pixelResolver';
import { MoreComponent } from './MenuSelect';

const walletData = [
  {
    color: '#416ed5',
    text: 'My Fantom Wallet',
    code: 'FTM',
    id: '0x8920…2c43e7'
  },
  {
    color: '#ff9c8b',
    text: 'Orange Wallet',
    code: 'ERC20',
    id: '0x2320…3e46c5'
  },
  {
    color: '#59c5dd',
    text: 'Aqua Wallet',
    code: 'BEP2',
    id: '0x7220…2c43e7'
  },
  {
    color: '#cdd4d8',
    text: 'Grey Wallet',
    code: 'FTM',
    id: '0x2320…3e46c5'
  },
  {
    color: '#eaf598',
    text: 'Yellow Wallet',
    code: 'ERC20',
    id: '0x1111…3a6454'
  }
];
let data = [
  {
    value: 'Banana'
  },
  {
    value: 'Mango'
  },
  {
    value: 'Pear'
  }
];
class ManageWallet extends Component {
  state = {
    showModal: false,
    renameModal: false,
    isModalOpened: [],
    openColorPalette: false
  };

  componentDidMount() {
    const modalOpenData = [];
    walletData.forEach(() => {
      modalOpenData.push('false');
    });
    this.setState({ isModalOpened: modalOpenData });
  }

  render() {
    const { showModal, renameModal, openColorPalette } = this.state;

    return (
      <View style={styles.mainView}>
        <SafeAreaView style={styles.mainView}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headingView}>
            <TouchableOpacity>
              <Image
                source={CrossIcon}
                style={styles.crossIcon}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
            <Text style={styles.headingText}>Manage wallets</Text>
          </View>
          <FlatList
            data={walletData}
            bounces={false}
            extraData={this.state}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.middleView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={EqualIcon}
                      style={styles.equalIcon}
                      resizeMode="contain"
                    ></Image>
                    <View
                      style={{
                        ...styles.circularView,
                        backgroundColor: item.color
                      }}
                    ></View>
                    <View style={styles.centerTextView}>
                      {/* {walletName ? (
                        <Text style={styles.rowsText}>{walletName}</Text>
                      ) : ( */}
                      <Text style={styles.rowsText}>{item.text}</Text>
                      {/* )} */}
                      <View style={styles.centerBottomText}>
                        <Text style={styles.centerText}>{item.code}</Text>
                        <Text style={{ ...styles.centerText, marginLeft: 10 }}>
                          {item.id}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <MoreComponent
                    id={index}
                    showModal={this.state.showModal[index]}
                    toggleModal={id => {
                      const obj = {
                        [id]: true
                      };
                      this.setState({ showModal: obj });
                    }}
                  /> */}
                  <TouchableOpacity
                    onPress={() => {
                      const modalVal = this.state.showModal;
                      console.log(modalVal, 'modalVal ********');
                    }}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={18}
                      color={Colors.textGrey}
                    ></Entypo>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ position: 'absolute', right: 0}}>
                    <Dropdown
                      data={[
                        {
                          value: 'Rename'
                        },
                        {
                          value: 'Change Color'
                        }
                      ]}
                      value="Select"
                      baseColor={Colors.transparent}
                      selectedItemColor={Colors.textBlack}
                      itemColor={Colors.textBlack}
                      textColor={Colors.white}
                      dropdownOffset={{ top: 10 }}
                      dropdownPosition={0}
                      pickerStyle={{
                        width: getWidth(140),
                        height: getHeight(140),
                        paddingVertical: getHeight(10),
                        borderRadius: getHeight(12),
                        marginLeft: DEVICE_WIDTH * 0.53
                      }}
                      containerStyle={{
                        height: 20,
                        width: 20
                      }}
                      itemTextStyle={{
                        color: Colors.textBlack,
                        fontFamily: fonts.WorkSansBold,
                        fontSize: FontSize.mediumSmall,
                        textAlign:'center'
                      }}
                      onChangeText={(value) => {
                        if (value === "Rename") {
                          this.setState({renameModal:!renameModal})
                        }
                        else {
                          this.setState({openColorPalette:!openColorPalette})
                        }
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {renameModal && (
            <ModalView
              backdrop={false}
              style={styles.renameModalStyle}
              position="up"
              isOpen={renameModal}
              backdrop
              backdropOpacity={0.5}
              backdropColor={Colors.white}
              onClosed={() => this.setState({ renameModal: false })}
            >
              <TextInput
                style={styles.textInput}
                onChangeText={value => this.setState({ walletName: value })}
              />
            </ModalView>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

export default ManageWallet;
