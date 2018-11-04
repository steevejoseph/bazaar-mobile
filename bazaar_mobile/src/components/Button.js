import React from "react";
import { Text, TouchableOpacity } from "react-native";

// AKA TouchableHighlight and/or TouchableOpacity (via RN docs)
// highlight: button turned a diff color when pressed/
// opacity: button fades a lil`
const Button = props => {
  const { buttonStyle, textStyle } = styles;

  return (
    // {/*when pressed, call the func passed in via props*/}
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonStyle: {
    // flex 1 means "expand to fill entire space"
    flex: 0,
    // align this element with flexbox rules
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: 350
  }
};
export default Button;
