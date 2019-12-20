import React from 'react';
import SuccessScreen from '../../general/SuccessScreen';
import { NavigationService, routes } from '~/navigation/helpers';
const Success = (props) => {
  const handleOnPress = () => {
    NavigationService.navigate(routes.root.HomeScreen);
  };
  return (
    <SuccessScreen
      onPress={handleOnPress}
      text="Tokens staked succesfully!"
    ></SuccessScreen>
  );
};

export default Success;
