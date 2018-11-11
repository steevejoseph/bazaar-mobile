import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

class Inbox extends Component {
  render() {
    return (
      <Card>
        <ScrollView>
          <Text>Placeholder</Text>
        </ScrollView>
        <Footer footerText="" />
      </Card>
    );
  }
}

export { Inbox };
