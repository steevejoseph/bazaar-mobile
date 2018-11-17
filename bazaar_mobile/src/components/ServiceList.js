import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { fetchAllServices } from '../actions';
import ServiceListItem from './ServiceListIem';

class ServiceList extends Component {
  renderItem(service) {
    return <ServiceListItem service={service} />;
  }

  render() {
    return (
      <FlatList
        style={{ backGroundColor: '#f8f8f8' }}
        data={this.props.services}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()} // TODO: make KeyExtractor pull service ID.
      />
    );
  }
}

export default ServiceList;
