/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

type Props = {
  id: string,
  name: string,
  line1Text: string,
  rate: boolean,
  isEditMode: boolean,
  delete: (string) => void,
  rateChange: (string) => void,
  onSelection: (string) => void,
  handleEditContact: (string, string) => void,
}

/**
 * Address: This component is meant for rendering list of address saved in address book.
 */
const Address = ({
  id,
  name,
  line1Text,
  rate,
  isEditMode = false,
  delete: handleDelete,
  rateChange,
  onSelection,
  handleEditContact = () => { },
}: Props) => {
  const onAddressSelection = () => onSelection && onSelection(id);


  const _handleEditContact = (_name, address) => {
    handleEditContact(_name || 'Anonymous', address);
  };

  let starIcon = 'star-border';
  if (rate) {
    starIcon = 'star';
  }

  const MainView = isEditMode ? TouchableOpacity : View;
  const propsMainView = isEditMode ? { onPress: onAddressSelection } : {};

  return (
    // $FlowFixMe
    <MainView style={styles.container} {...propsMainView}>
      <View style={styles.subContainer}>
        <View style={styles.subSubContainer}>
          {/* Left container */}
          <View style={styles.leftContainerStyle}>
            <TouchableOpacity onPress={() => rateChange(id)}>
              <Icon name={starIcon} size={25} color="rgb(0,177,251)" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineSeparatorStyle} />
          {/* Middle container */}
          <View style={styles.mid}>
            <Text style={styles.nameContainer}>{name || 'Anonymous'}</Text>
            <Text style={styles.addressTextStyle}>{line1Text}</Text>
          </View>
          {/* Rightcontainer */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() => _handleEditContact(name, line1Text)}
              style={styles.optionButtonStyle}
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(id)}
              style={styles.optionButtonStyle}
            >
              <FontAwesomeIcons style={{ color: '#FFF' }} name="trash" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainView >
  );
};

export default Address;
