import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { fetchAllServices } from '../actions';
import ServiceListItem from './ServiceListIem';

class ServiceList extends Component {
  componentWillMount() {
    this.props.fetchAllServices();
  }

  renderItem(service) {
    return <ServiceListItem service={service} />;
  }

  render() {
    return <FlatList style={{ backGroundColor: '#f8f8f8' }} data={this.props.services} renderItem={this.renderItem} />;
  }
}

const mapStateToProps = state => ({
  services: state.service.services,
});

export default connect(
  mapStateToProps,
  { fetchAllServices }
)(ServiceList);
