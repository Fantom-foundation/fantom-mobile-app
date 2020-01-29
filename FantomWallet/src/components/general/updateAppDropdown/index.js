// @flow
import React , {useState } from 'react';
import { Modal , TouchableOpacity , Linking , Platform , Text , View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors} from "../../../theme";


export default (props:any) => {
  const { isDisplayModal } = props;
  const [isModalVisible , setModalVisible]=useState(isDisplayModal)
    const APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1436694080?mt=8';
  const PLAY_STORE_LINK = 'market://details?id=com.fantomwallet';
  const handleModalClick = () => {
        if(Platform.OS =='ios')
            Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
         else
            Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));

     }
  return (
  
    <Modal transparent
      visible={isModalVisible}>
     <View style={styles.wrapper}
       >
        <View style={styles.updateView}>
        <Text style={styles.updateText}>A new update is available.</Text>
        <TouchableOpacity  onPress={handleModalClick}>
          <Text style={styles.updateNow}>Update now.</Text>
        </TouchableOpacity >
          </View>
        <TouchableOpacity stylle={styles.cancelButton}
        onPress={()=> setModalVisible(false)}>
        <Icon name="cancel" size={25} color={Colors.white} />
        </TouchableOpacity>
        </View>
    </Modal>
    
  );
}