import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput
} from 'react-native';
import styles from './styles';
import { CrossIcon, EqualIcon } from '../../../images';
import { Colors, fonts, FontSize } from '../../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalView from 'react-native-modalbox';
import { Dropdown } from 'react-native-material-dropdown';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '~/common/constants';
import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { connect } from 'react-redux';

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
const colors = [
  '#416ed5',
  '#fe9d8b',
  '#59c5dd',
  '#cdd4d8',
  '#e6fc88',
  '#fcd3ff',
  '#fff666',
  '#7bc5ff',
  '#40c49d',
  '#8959dd',
  '#ffb966',
  '#e32c2c',
  '#a650a6',
  '#78dd59',
  '#4649fd',
  '#5f5f7c'
];
const ManageWallet = props => {
  const { navigation, wallet } = props;
  const { walletsData } = wallet;
  console.log('***Current wallet', walletsData);
  const [showModal, setShowModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState([]);
  const [openColorPalette, setOpenColorPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [walletName, setWalletName] = useState('');
  useEffect(() => {
    const modalOpenData = [];
    walletData.forEach(() => {
      modalOpenData.push('false');
    });
    setIsModalOpened(modalOpenData);
  });

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.mainView}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={CrossIcon}
              style={styles.crossIcon}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <Text style={styles.headingText}>Manage wallets</Text>
        </View>
        <FlatList
          data={walletsData}
          bounces={false}
          extraData={[showModal, openColorPalette]}
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
                      backgroundColor: Colors.royalBlue
                    }}
                  ></View>
                  <View style={styles.centerTextView}>
                    <Text style={styles.rowsText}>{item.name}</Text>
                    <View style={styles.centerBottomText}>
                      <Text style={styles.centerText}>FTM</Text>
                      <Text
                        style={{
                          ...styles.centerText,
                          marginLeft: 20,
                          width: getWidth(180)
                        }}
                      >
                        {`${item.publicKey.substring(
                          1,
                          7
                        )}... ${item.publicKey.substring(
                          item.publicKey.length - 6
                        )}`}
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
                    const modalVal = showModal;
                  }}
                >
                  <Entypo
                    name="dots-three-vertical"
                    size={18}
                    color={Colors.textGrey}
                  ></Entypo>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', right: 0 }}>
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
                      textAlign: 'center'
                    }}
                    onChangeText={value => {
                      if (value === 'Rename') {
                        setRenameModal(!renameModal);
                      } else {
                        setOpenColorPalette(!openColorPalette);
                      }
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {renameModal ? (
          <ModalView
            backdrop={false}
            style={styles.renameModalStyle}
            position="up"
            isOpen={renameModal}
            backdrop
            backdropOpacity={0.5}
            backdropColor={Colors.white}
            onClosed={() => setRenameModal(false)}
          >
            <TextInput
              style={styles.textInput}
              onChangeText={value => setWalletName(value)}
            />
          </ModalView>
        ) : (
          <ModalView
            backdropOpacity={0.7}
            backdropColor={'white'}
            backdrop={true}
            style={styles.colorModalStyle}
            position="up"
            isOpen={openColorPalette}
            onClosed={() => setOpenColorPalette(false)}
          >
            <View style={{ marginHorizontal: 30 }}>
              <Text style={styles.codeText}>Select a color</Text>

              <View
                style={{
                  flex: 1,
                  top: getHeight(12),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                {colors.map(item => {
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setSelectedColor(item);
                        setOpenColorPalette(false);
                      }}
                      style={{
                        width: getWidth(50),
                        height: getWidth(50),
                        marginVertical: getHeight(12),
                        marginRight: getHeight(10),
                        borderRadius: getWidth(25),
                        backgroundColor: item
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </ModalView>
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWallet);
