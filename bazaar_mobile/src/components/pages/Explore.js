import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, Footer } from '../common';
import ServiceList from '../ServiceList';

class Explore extends Component {
  render() {
    return (
      <Card>
        <ServiceList />
        <Footer />
      </Card>
    );
  }
}

export default Explore;
