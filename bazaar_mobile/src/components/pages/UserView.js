import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, CardSection, Button } from '../common';

class UserView extends Component {
  render() {
    const bazaaro = this.props.owner;
    return (
      <Card>
        <CardSection>
          <Text>{`${bazaaro.firstName} ${bazaaro.lastName}`}</Text>
        </CardSection>
        <CardSection>
          <Text>{bazaaro.email}</Text>
        </CardSection>
      </Card>
    );
  }
}

export default UserView;
