import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import ServiceList from '../ServiceList';
import { fetchFavorites, addFavorite } from '../../actions';

class Favorites extends Component {
  componentWillMount() {
    this.props.fetchFavorites(this.props.user._id);
  }

  render() {
    // const { scrollViewStyle, placeholderStyle } = styles;
    return (
      <Card>
        <ServiceList
          services={this.props.favorites}
          favorites={this.props.favorites}
          addFavorite={this.props.addFavorite}
        />
        <Footer />
      </Card>
    );
  }
}

const styles = {
  scrollViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  placeholderStyle: {
    color: '#333',
    opacity: 0.25,
    fontSize: 16,
    fontWeight: '600',
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
  favorites: state.service.favorites,
});

export default connect(
  mapStateToProps,
  {
    fetchFavorites,
    addFavorite
  }
)(Favorites);
