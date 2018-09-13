import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
import walletIcon from '../../../../../../images/wallet.png';
/**
 * EmptyTransactionEntity: This component is meant to display informational message,
 *  when wallet does not contains any transaction.
 */
class EmptyTransactionEntity extends PureComponent {
  render() {
    const { title, message } = this.props;
    return (
      <View style={style.mainViewStyle}>
        <Image source={walletIcon} resizeMode="contain" />
        <Text style={style.headingInfoStyle}>{title} </Text>
        <Text style={style.textInfoStyle}>{message} </Text>
      </View>
    );
  }
}
EmptyTransactionEntity.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
export default EmptyTransactionEntity;
