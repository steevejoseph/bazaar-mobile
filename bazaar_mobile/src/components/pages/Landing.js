import React, { Component } from 'react';
import { View, Linking, Image } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-carousel';

import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../common';
// import SideScroller from '../SideScroller'; so long old friend.

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
];

const getImg = () =>
  images.map(img => (
    <View key={img}>
      {/* <Text>Hi</Text> */}
      <Image style={{ width: '100%', height: '100%' }} source={{ uri: img }} />
    </View>
  ));

class Landing extends Component {
  render() {
    const { scrollViewContainerStyle } = styles;
    return (
      <Card>
        {/* <SideScroller /> */}
        <Carousel loop animate hideIndicators delay={3000}>
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

const styles = {
  scrollViewContainerStyle: {
    horizontal: true,
  },
};

export default Landing;
