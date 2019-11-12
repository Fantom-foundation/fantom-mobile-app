// @flow
// Library
import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type { TransactionT } from '~/redux/wallet/actions';
import { toFixed } from '~/utils/converts';
// Styling
import styles from './styles';

type Props = {
  transaction: TransactionT,
  publicKey: string,
};

/**
 * TransacationEntity: This component is meant for rendering transaction cards.
 */
const TransacationEntity = ({ transaction, publicKey }: Props) => {
  const renderDateContainer = (date: string, month: string) => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateTextStyle}>{date}</Text>
      <Text style={[styles.dateTextStyle, { fontSize: 10 }]}>{month}</Text>
    </View>
  );

  const renderIdContainer = (Id: string) => (
    <View style={styles.idContainerStyle}>
      <Text style={styles.idTextStyle} numberOfLines={1}>
        {Id}
      </Text>
    </View>
  );

  // renderTimeDiffcontainer(diff) {
  //   return (
  //     <View style={styles.timeDiffContainer}>
  //       <Text style={styles.timeDiffTextStyle}>{diff}</Text>
  //     </View>
  //   );
  // }

  const renderAmtcontainer = (iconColor: string, ftmBalance: string, transactionAmountUnit: string) => (
    <View style={[styles.amountContainerStyle, { backgroundColor: iconColor }]}>
      <Text style={styles.amountValueTextStyle}>
        {ftmBalance} {''}
      </Text>
      <Text style={styles.amountUnitTextStyle}>{transactionAmountUnit}</Text>
    </View>
  );


  const iconName = 'arrow-back';
  let iconColor = 'rgb(255,0,0)';

  let iconStyle = {
    transform: [{ rotateX: '0deg' }, { rotateY: '180deg' }, { rotateZ: '45deg' }],
  };
  let Id = '';
  let date = '';
  let month = '';
  // let diff = '';
  let ftmBalance = '-';
  let transactionAmountUnit = 'FTM';
  if (transaction) {
    if (
      transaction.from &&
      transaction.from !== '' &&
      transaction.from !== null &&
      transaction.from !== undefined &&
      transaction.from !== publicKey
    ) {
      iconColor = 'rgb(94,179,18)';
      iconStyle = {
        transform: [{ rotateX: '0deg' }, { rotateY: '0deg' }, { rotateZ: '-45deg' }],
      };
      Id = transaction.from;
    } else if (
      transaction.to &&
      transaction.to !== '' &&
      transaction.to !== null &&
      transaction.to !== undefined
    ) {
      Id = transaction.to;
    }
  }

  if (
    transaction &&
    transaction.date &&
    transaction.date !== '' &&
    transaction.date !== null &&
    transaction.date !== undefined
  ) {
    date = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').format('DD');
    month = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').format('MMM');
    // diff = moment(transaction.date, 'YYYY-MMM-DD hh:mm:ss a').fromNow();
    if (date === 'Invalid date' || month === 'Invalid date') {
      date = '';
      month = '';
      // diff = '';
    }
  }

  if (transaction && transaction.amount) {
    const valInEther = transaction.amount;
    ftmBalance = toFixed(valInEther, 4);
  }
  if (
    transaction &&
    transaction.amountUnit &&
    transaction.amountUnit !== '' &&
    transaction.amountUnit !== null &&
    transaction.amountUnit !== undefined
  ) {
    transactionAmountUnit = transaction.amountUnit;
  }

  return (
    <View style={styles.mainContainerStyle}>
      {renderDateContainer(date, month)}
      <View style={styles.iconContainerStyle}>
        <MaterialIcons name={iconName} size={18} color={iconColor} style={iconStyle} />
      </View>
      {renderIdContainer(Id)}
      {/* {renderTimeDiffcontainer(diff)} */}
      {renderAmtcontainer(iconColor, ftmBalance, transactionAmountUnit)}
    </View>
  );
};

export default TransacationEntity;
