import React, { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./style";
import CheckboxBorder from "../../images/checkbox.png";
import checkedIcon from "../../images/CheckedIcon.png";

const CheckBox = props => {
  const [checked, setChecked] = useState(false);
  const { onChange } = props;

  return (
    <TouchableOpacity
      style={styles.checkBoxStyle}
      activeOpacity={1}
      onPress={() => {
        setChecked(!checked);
        onChange(!checked);
      }}
    >
      <Image
        source={checked ? checkedIcon : CheckboxBorder}
        style={styles.imgStyle}
      />
    </TouchableOpacity>
  );
};

export default CheckBox;
