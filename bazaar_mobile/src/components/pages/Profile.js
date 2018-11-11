import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

class Profile extends Component {
  render() {
    const { infoTextStyle, infoContainerStyle } = styles;
    return (
      <Card>
        <ScrollView>
          <CardSection style={infoContainerStyle}>
            <Text style={infoTextStyle}>First Name:</Text>
          </CardSection>
          <CardSection style={infoContainerStyle}>
            <Text style={infoTextStyle}>Last Name:</Text>
          </CardSection>
          <CardSection style={infoContainerStyle}>
            <Text style={infoTextStyle}>Email:</Text>
          </CardSection>
          <CardSection style={infoContainerStyle}>
            <Text style={infoTextStyle}>Phone number:</Text>
          </CardSection>
        </ScrollView>
        <Button
          style={{ backgroundColor: 'red', marginBottom: 10, alignSelf: 'stretch' }}
          onPress={() => Actions.Landing({ type: 'reset' })}
        >
          Logout
        </Button>
        <Footer footerText="" />
      </Card>
    );
  }
}

const styles = {
  infoContainerStyle: {
    justifyContent: 'flex-start',
  },
  infoTextStyle: {
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '600',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
  },
};

export { Profile };
