import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

class MyServices extends Component {
  render() {
    const { scrollViewStyle, placeholderStyle } = styles;
    return (
      <Card>
        <ScrollView style={{ backgroundColor: '#f8f8f8' }} contentContainerStyle={scrollViewStyle}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={placeholderStyle}>You have no services.</Text>
          </View>
        </ScrollView>
        <Footer footerText="" />
      </Card>
    );
  }
}

const styles = {
  scrollViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  placeholderStyle: {
    color: '#333',
    opacity: 0.25,
    fontSize: 16,
    fontWeight: '600',
  },
};

export default MyServices;
