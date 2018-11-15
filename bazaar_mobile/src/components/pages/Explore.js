import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { services: [] };
  }

  componentWillMount() {
    axios.get('https://bazaar-backend.herokuapp.com/api/services').then(response => {
      console.log(response.data);
      this.setState({ services: response.data.services });
    });
  }

  renderServices() {
    return this.state.services.map(service => (
      <CardSection key={service._id}>
        <Text>{service.name}</Text>
      </CardSection>
    ));
  }

  render() {
    return (
      <Card>
        <ScrollView style={{ marginBottom: 3, backGroundColor: '#f8f8f8' }}>{this.renderServices()}</ScrollView>
        <Footer footerText="" />
      </Card>
    );
  }
}

export default Explore;
