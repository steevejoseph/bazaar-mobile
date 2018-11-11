import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

class Profile extends Component {
  render() {
    return (
      <Card>
        <ScrollView>
          <Text>Placeholder</Text>
        </ScrollView>
        <Button style={{ backgroundColor: 'red', marginBottom: 10, alignSelf: 'stretch' }}>Logout</Button>
        <Footer footerText="" />
      </Card>
    );
  }
}

export { Profile };
