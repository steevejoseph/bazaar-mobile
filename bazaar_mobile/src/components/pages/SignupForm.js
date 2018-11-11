import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class SignupForm extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input label="First Name" placeholder="John" />
        </CardSection>
        <CardSection>
          <Input label="Last Name" placeholder="Smith" />
        </CardSection>

        <CardSection>
          <Input label="Email" placeholder="email@gmail.com" />
        </CardSection>

        <CardSection>
          <Input secureTextEntry label="Password" placeholder="password" />
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.Explore({ type: 'reset' })}>Sign up</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

export default SignupForm;
