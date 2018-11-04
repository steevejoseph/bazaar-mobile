/** @format */
import React, { Component } from 'react';
import { AppRegistry, Text, View, Linking } from 'react-native';
import { name as appName } from './app.json';
import Button from './src/components/Button';
import Section from './src/components/Section.js';
import Header from './src/Header.js';

const App = () => {
  const { itemStyle, textStyle } = styles;

  return (
    <View>
      <Header headerText="Bazaar" />
      <Button onPress={() => Linking.openURL('https://github.com/steevejoseph/bazaar-mobile')}>See the code!</Button>
      <Button>Signup</Button>
      <Button>Login</Button>
    </View>
  );
};

const styles = {
  itemStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#000',
  },

  textStyle: {
    fontSize: 32,
    fontWeight: '600',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

AppRegistry.registerComponent(appName, () => App);
