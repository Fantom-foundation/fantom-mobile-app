import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import style from './style';

/**
 * SortMenuCard: A generic component for displaying a list of sort menu.
 */
class SortMenuCard extends Component {
  constructor(props) {
    super(props);
    let dataObj;
    if (this.props.data) {
      dataObj = this.props.data;
    }
    this.state = {
      selectedIndex: this.props.index || 0,
      data: dataObj,
    };
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(index, item) {
    this.props.handleSortMenu(item);
  }

  render() {
    return (
      <View
        style={
          this.props.type === 'withDraw' ? style.listContainerStyle : style.altListContainerStyle
        }
      >
        <View style={style.listStyle}>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => (
              <View style={style.listItemStyle}>
                <Text>{item.key}</Text>
                <TouchableOpacity
                  style={style.listButtonStyle}
                  onPress={() => this.toggleHandler(index, item)}
                >
                  <MaterialIcons
                    name={
                      this.state.selectedIndex === index
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    style={
                      this.state.selectedIndex === index
                        ? style.checkedButtonStyle
                        : style.uncheckedButtonStyle
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

/**
 * Custom setting props to be passed for SortMenuCard display changes:
 *
 * type: Contains information of type of SortMenuCard.
 * data: Contains list of sort menu for SortMenuCard.
 * index: Contains number value for selected value from SortMenuCard.
 * handleSortMenu: Callback function to handle sorting opertion.
 *
 */

SortMenuCard.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  index: PropTypes.number,
  handleSortMenu: PropTypes.func,
};
export default SortMenuCard;
