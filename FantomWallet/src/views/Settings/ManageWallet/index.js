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
import { DEVICE_WIDTH } from '~/common/constants';
import { getHeight, getWidth } from '../../../utils/pixelResolver';
import { connect } from 'react-redux';
import { setWalletName as setWalletNameAction } from '~/redux/wallet/actions';
const ManageWallet = props => {
  const { navigation, wallet, setWalletName } = props;
  const { walletsData } = wallet;
  const [showModal, setShowModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState([]);
  const [openColorPalette, setOpenColorPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedKey, setSelectedKey] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const modalOpenData = [];
    setIsModalOpened(modalOpenData)
  }, []);
  const handleDoneButton = () => {
    setRenameModal(false);
    if (selectedKey && name)
      setWalletName({ name: name, publicKey: selectedKey });
  };
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
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
                        {item &&
                          item.publicKey &&
                          `${item.publicKey.substring(
                            1,
                            7
                          )}... ${item.publicKey.substring(
                            item.publicKey.length - 6
                          )}`}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const modalVal = showModal;
                  }}
                >
                  <Entypo
                    name="dots-three-vertical"
                    size={18}
                    color={Colors.textGrey}
                    style={styles.dotIcon}
                  ></Entypo>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0
                  }}
                >
                  <Dropdown
                    data={[
                      {
                        value: 'Rename'
                      },
                      // {
                      //   value: 'Change Color'
                      // }
                    ]}
                    value="Select"
                    baseColor={Colors.transparent}
                    selectedItemColor={Colors.textBlack}
                    itemColor={Colors.textBlack}
                    textColor={Colors.white}
                    dropdownOffset={{ top: 10 }}
                    dropdownPosition={0}
                    pickerStyle={{
                      width: getWidth(120),
                      height: getHeight(120),
                      paddingVertical: getHeight(20),
                      borderRadius: getHeight(12),
                      marginLeft: DEVICE_WIDTH * 0.53,
                      alignItems: 'center',
                      justifyContent:'center'
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
                        setName(item.name);
                        setSelectedKey(item.publicKey);
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
        {renameModal && (
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
              onChangeText={value => setName(value)}
              value={name}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDoneButton}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </ModalView>
        )
        // : (
        //   <ModalView
        //     backdropOpacity={0.7}
        //     backdropColor={'white'}
        //     backdrop={true}
        //     style={styles.colorModalStyle}
        //     position="up"
        //     isOpen={openColorPalette}
        //     onClosed={() => setOpenColorPalette(false)}
        //   >
        //     <View style={{ marginHorizontal: 30 }}>
        //       <Text style={styles.codeText}>Select a color</Text>

        //       <View
        //         style={{
        //           flex: 1,
        //           top: getHeight(12),
        //           flexDirection: 'row',
        //           flexWrap: 'wrap',
        //           justifyContent: 'space-between'
        //         }}
        //       >
        //         {colors.map(item => {
        //           return (
        //             <TouchableOpacity
        //               key={item}
        //               onPress={() => {
        //                 setSelectedColor(item);
        //                 setOpenColorPalette(false);
        //               }}
        //               style={{
        //                 width: getWidth(50),
        //                 height: getWidth(50),
        //                 marginVertical: getHeight(12),
        //                 marginRight: getHeight(10),
        //                 borderRadius: getWidth(25),
        //                 backgroundColor: item
        //               }}
        //             />
        //           );
        //         })}
        //       </View>
        //     </View>
        //   </ModalView>
        // )
        }
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = {
  setWalletName: setWalletNameAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWallet);
