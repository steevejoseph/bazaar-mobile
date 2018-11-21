import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, Footer } from '../common';
import ServiceList from '../ServiceList';
import { fetchAllServices } from '../../actions';

class Explore extends Component {
  componentWillMount() {
    this.props.fetchAllServices();
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
  services: state.service.services,
});

export default connect(
  mapStateToProps,
  { fetchAllServices }
)(Explore);
