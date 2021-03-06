import React, { Component } from 'react';
import { FlatList, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ServiceListItem from './ServiceListItem';
import { CategoryCard } from './common/CategoryCard';

import { CATEGORIES } from '../constants';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services || [],
      favorites: props.favorites || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services !== this.props.services) {
      this.setState({ services: nextProps.services });
    }
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }

  onChangeText(text) {
    const services = this.props.services;
    const query = text.toLowerCase();

    const found = services.filter(service => {
      let { name, description } = service;
      name = name.toLowerCase();
      description = description.toLowerCase();

      return name.includes(query) || description.includes(query);
    });

    this.setState({ services: found });
  }

  renderItem(service) {
    const favoriteIds = this.state.favorites.map(favorite => favorite._id);
    const isFavorite = favoriteIds.includes(service.item._id);

    return <ServiceListItem service={service} isFavorite={isFavorite} addFavorite={this.props.addFavorite} />;
  }

  renderCategoryCard(categoryItem) {
    const category = categoryItem.item;
    return <CategoryCard title={category.title} description={category.description} />;
  }

  render() {
    // console.log(CATEGORIES);
    return (
      <ScrollView style={{ flex: 1 }}>
        <SearchBar
          lightTheme
          containerStyle={{ backgroundColor: '#fff', marginBottom: 0, paddingBottom: 0 }}
          inputStyle={{ backgroundColor: '#f0f0f0' }}
          clearIcon={{ color: 'black' }}
          onChangeText={text => this.onChangeText(text)}
          placeholder="What brings you?"
        />
        {/* <FlatList
          horizontal
          style={{ backGroundColor: '#f8f8f8' }}
          data={CATEGORIES}
          renderItem={this.renderCategoryCard.bind(this)}
          keyExtractor={(item, index) => index.toString()} // TODO: make KeyExtractor pull service ID.
        /> */}
        <FlatList
          style={{ backGroundColor: '#f8f8f8' }}
          data={this.state.services}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()} // TODO: make KeyExtractor pull service ID.
        />
      </ScrollView>
    );
  }
}

export default ServiceList;
