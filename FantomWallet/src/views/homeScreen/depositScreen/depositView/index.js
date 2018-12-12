// Library
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
// Components
import style from './style';
import DepositViewInfo from '../depositViewInfo';

/**
 * DepositNavigationBar: This component is meant for handling deposit screen.
 */
class DepositNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={style.mainContainerStyle}>
        <DepositViewInfo navigation={navigation} />
      </View>
    );
  }
}

DepositNavigationBar.propTypes = {
  navigation: PropTypes.object,
};

export default DepositNavigationBar;
