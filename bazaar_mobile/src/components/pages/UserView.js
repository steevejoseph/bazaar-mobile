import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import AnimateNumber from 'react-native-countup';
import { Card, CardSection } from '../common';

class UserView extends Component {
  render() {
    const { infoContainerStyle, userTextStyle } = styles;
    const bazaaro = this.props.owner;
    return (
      <Card>
        <CardSection style={infoContainerStyle}>
          <Avatar
            xlarge
            rounded
            source={{
              uri:
                'http://meridianpm.us/wp-content/uploads/2016/05/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon-300x300.jpg',
            }}
            // onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text style={userTextStyle}>{`${bazaaro.firstName} ${bazaaro.lastName}`}</Text>
          <Text style={{ fontSize: 24 }}>{bazaaro.email}</Text>

          <Text style={{ fontSize: 18 }}>Average rating:</Text>
          <Badge textStyle={{ color: '#fff' }} containerStyle={{ backgroundColor: '#6c757d' }}>
            <Text style={{ color: '#fff' }}>
              <AnimateNumber countBy={0.1} value={4.3} formatter={val => `${parseFloat(val).toFixed(1)}`} />
            </Text>
          </Badge>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  infoContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  userTextStyle: {
    // flex: 1,
    color: '#333',
    fontSize: 32,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '800',
  },
};

export default UserView;
