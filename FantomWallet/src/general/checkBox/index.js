import React, { Component } from "react";
import { TouchableOpacity,Image} from "react-native";
import styles from "./style";
import checkbox from "../../images/checkbox.png";
import checkedIcon from "../../images/CheckedIcon.png";

class CheckBox extends Component {
state={
    checked:false
}

  render() {
      const {onChange}=this.props
      const { checked, } = this.state;

    return (
      <TouchableOpacity
        style={styles.checkBoxStyle}
        activeOpacity={1}
        onPress={() => {
          this.setState({ checked: !checked });
          onChange(!checked);
        }}
      >
        <Image
          source={checked ? checkedIcon : checkbox}
          style={styles.imgStyle}
        />
      </TouchableOpacity>
    );
  }
}

export default CheckBox;
