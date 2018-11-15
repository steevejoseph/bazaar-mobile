import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import { fetchUserServices } from '../../actions';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
class MyServices extends Component {
  componentWillMount() {
    this.props.fetchUserServices(this.props.user._id);
  }

  renderServices() {
    const services = this.props.services;
    const { placeholderStyle } = styles;

    if (services === null || services === undefined || services.length < 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[placeholderStyle]}>You have no services.</Text>
        </View>
      );
    }

    return services.map(service => (
      <CardSection key={service._id}>
        <Text>{service.name}</Text>
      </CardSection>
    ));
  }

  render() {
    const { scrollViewStyle, placeholderStyle } = styles;
    return (
      <Card>
        <ScrollView style={{ backgroundColor: '#f8f8f8' }}>{this.renderServices()}</ScrollView>
        <Footer footerText="" />
      </Card>
    );
  }
}

const styles = {
  placeholderStyle: {
    color: '#333',
    opacity: 0.25,
    fontSize: 16,
    fontWeight: '600',
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
  services: state.service.userServices,
});

export default connect(
  mapStateToProps,
  {
    fetchUserServices,
  }
)(MyServices);
