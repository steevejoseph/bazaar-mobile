import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, Footer } from '../common';
import ServiceList from '../ServiceList';
import { fetchUserServices } from '../../actions';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
class MyServices extends Component {
  componentWillMount() {
    this.props.fetchUserServices(this.props.user._id);
  }

  render() {
    return (
      <Card>
        <ServiceList services={this.props.services} />
        <Footer />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  services: state.service.userServices,
});

export default connect(
  mapStateToProps,
  { fetchUserServices }
)(MyServices);
