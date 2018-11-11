import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => {
  const { buttonStyle, textStyle } = styles;
  console.log(props.style);
  return (
    <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
      <Text style={textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
  },

  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
  },
};

export { Button };
