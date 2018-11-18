import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ServiceListItem from './ServiceListItem';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: this.props.services || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services !== this.props.services) {
      this.setState({ services: nextProps.services });
    }
  }

  onChangeText(text) {
    const services = this.props.services;
    const query = text.toLowerCase();
    const found = services.filter(
      service => service.name.toLowerCase().contains(query) || service.description.toLowerCase().contains(query)
    );

    this.setState({ services: found });
  }

  renderItem(service) {
    return <ServiceListItem service={service} />;
  }

  render() {
    return (
      <View style={{ height: '90%' }}>
        <SearchBar
          lightTheme
          containerStyle={{ backgroundColor: '#fff', marginBottom: 0, paddingBottom: 0 }}
          inputStyle={{ backgroundColor: '#f0f0f0' }}
          clearIcon={{ color: 'black' }}
          onChangeText={text => this.onChangeText(text)}
          placeholder="What brings you?"
        />
        <FlatList
          style={{ backGroundColor: '#f8f8f8' }}
          data={this.state.services}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()} // TODO: make KeyExtractor pull service ID.
        />
      </View>
    );
  }
}

export default ServiceList;
