// @flow
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import { setDopdownAlert as setDopdownAlertAction } from '~/redux/notification/actions';

type Props = {
  type: string,
  text: string | false,
  style: { [string]: string },
  setDopdownAlert: (string, false) => void
}

const DropdownNotification = ({ type, text, style = {}, setDopdownAlert }: Props) => {
  const _dropdown: any = useRef(null);
  const close = () => setDopdownAlert('', false);
  useEffect(() => {
    if (!text) return;
    _dropdown.current.alertWithType(type, text, '');
  }, [text]);
  return (
    <DropdownAlert
      containerStyle={{ backgroundColor: 'rgb(0,168,251)', ...style }}
      ref={_dropdown}
      onClose={close}
      useNativeDriver
    />
  );
};

export default connect(state => ({
  type: state.notification.type,
  text: state.notification.text,
  style: state.notification.style,
}), ({
  setDopdownAlert: setDopdownAlertAction,
}))(DropdownNotification);