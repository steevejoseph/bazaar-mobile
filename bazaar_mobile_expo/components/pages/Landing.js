import React, { Component } from 'react';
import { View, Linking, Image, ImageBackground, Text } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-carousel';

import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../common';

const images = [
  'https://images.unsplash.com/photo-1414611091494-9dc36f7730b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00b1a6b38677f1706416fdeecb5d7551&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1535448996690-4277028bb0e5?ixlib=rb-0.3.5&s=c47e010362a29f057ea3bcd6aac3bfc4&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f75361bb535d798b9936d0b3f53e9cd3&auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11be05062d1f7ba80ca7d217e0aa241f&auto=format&fit=crop&w=500&q=60',
];

const getImg = () =>
  images.map(img => (
    <View key={img}>
      {/* <Text>Hi</Text> */}
      <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: img }} />
    </View>
  ));

export default class Landing extends Component {
  render() {
    return (
      <Card style={{ flex: 1 }}>
        <Carousel loop animate hideIndicators delay={2500}>
          {getImg()}
        </Carousel>
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
