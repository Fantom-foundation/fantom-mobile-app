import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Colors, Messages } from "../../../theme";
import Entypo from "react-native-vector-icons/Entypo";
import ModalView from "react-native-modalbox";
import { getWidth } from "../../../utils/pixelResolver";

export const MoreComponent = props => {
  const [rename, renameModal] = useState(false);
  const { showModal, toggleModal, id } = props;

  return (
    <>
      <TouchableOpacity
        onPress={() => toggleModal(id)}
        // style={{ zIndex:-1 }}
      >
        <Entypo
          name="dots-three-vertical"
          size={18}
          color={Colors.textGrey}
        ></Entypo>
      </TouchableOpacity>
      {showModal && (
        <ModalView
          backdrop={false}
          style={styles.modalStyle}
          position="up"
          isOpen={showModal}
          onClosed={() => toggleModal(false)}
        >
          {/* <TouchableOpacity
                      onPress={() => {
                          toggleModal(false);
                          renameModal(!rename);
                      }}
                      style={{
                          backgroundColor: "red",
                          height: 30
                      }}
          >
              
            <Text style={styles.modalText}>Rename</Text>
          </TouchableOpacity>
          <TouchableOpacity 
                      style={{
                          backgroundColor: "red",
                          height: 30
                      }}>
            <Text style={styles.modalText}>Change color</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{ backgroundColor: "red", marginVertical: 20 }}
          >
            <Text style={styles.modalText}>{Messages.rename}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "red" }}>
            <Text style={styles.modalText}>{Messages.changeColor}</Text>
          </TouchableOpacity>
        </ModalView>
      )}
    </>
  );
};
