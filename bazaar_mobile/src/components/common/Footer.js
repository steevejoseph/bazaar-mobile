import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from '.';

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
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    height: 50,
    paddingTop: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
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
