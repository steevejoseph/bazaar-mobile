import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../common';

class Landing extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={() => Actions.SignupForm()}>Sign up</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => Actions.LoginForm()}>Log in</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => Linking.openURL('https://github.com/steevejoseph/bazaar-mobile')}>
            See the code!
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default Landing;
