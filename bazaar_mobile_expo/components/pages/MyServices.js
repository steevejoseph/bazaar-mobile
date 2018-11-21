import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, Footer } from '../common';
import MyServiceList from '../MyServiceList';
import { fetchUserServices, deleteService } from '../../actions';

class MyServices extends Component {
  componentWillMount() {
    this.props.fetchUserServices(this.props.user._id);
  }

  render() {
    return (
      <Card>
        <MyServiceList services={this.props.services} deleteService={this.props.deleteService} />
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
  {
    fetchUserServices,
    deleteService,
  }
)(MyServices);
