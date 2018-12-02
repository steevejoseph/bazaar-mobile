import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './Button';

const Footer = props => {
  const { textStyle, viewStyle, footerButtonStyle } = styles;

  return (
    <View style={viewStyle}>
      <Button style={footerButtonStyle} onPress={() => Actions.Explore({ type: 'reset' })}>
        <Text style={{ color: 'black' }}>Explore</Text>
      </Button>
      <Button style={footerButtonStyle} onPress={() => Actions.Favorites({ type: 'reset' })}>
        Favorites
      </Button>
      <Button style={footerButtonStyle} onPress={() => Actions.MyServices({ type: 'reset' })}>
        My Services
      </Button>
      <Button style={footerButtonStyle} onPress={() => Actions.Inbox({ type: 'reset' })}>
        Inbox
      </Button>
      <Button style={footerButtonStyle} onPress={() => Actions.Profile({ type: 'reset' })}>
        Profile
      </Button>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    height: 50,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    position: 'relative',
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 10,
  },

  textStyle: {
    fontSize: 20,
    color: 'red',
  },

  footerButtonStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'space-around',
  },
};

export { Footer };
