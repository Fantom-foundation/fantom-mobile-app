// @flow
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

/**
 * SortMenuCard: A generic component for displaying a list of sort menu.
 * type: Contains information of type of SortMenuCard.
 * data: Contains list of sort menu for SortMenuCard.
 * index: Contains number value for selected value from SortMenuCard.
 * handleSortMenu: Callback function to handle sorting opertion.
 */
const SortMenuCard = (props: TSortMenuCardTypes) => {
  const { data, index = 0, handleSortMenu, type } = props;
  <View
    style={
      type === 'withDraw' ? styles.listContainerStyle : styles.altListContainerStyle
    }
  >
    <View style={styles.listStyle}>
      <FlatList
        data={data}
        renderItem={({ item, index: _index }) => (
          <View style={styles.listItemStyle}>
            <Text>{item.key}</Text>
            <TouchableOpacity
              style={styles.listButtonStyle}
              onPress={() => handleSortMenu(item)}
            >
              <MaterialIcons
                name={
                  index === _index
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                style={
                  index === _index
                    ? styles.checkedButtonStyle
                    : styles.uncheckedButtonStyle
                }
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  </View>
};

export default SortMenuCard;
