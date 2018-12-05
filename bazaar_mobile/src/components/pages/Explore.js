import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, Footer } from '../common';
import ServiceList from '../ServiceList';
import { fetchAllServices, fetchFavorites, addFavorite } from '../../actions';

class Explore extends Component {
  componentWillMount() {
    this.props.fetchFavorites(this.props.user._id);
    this.props.fetchAllServices();
  }

  render() {
    return (
      <Card>
        <ServiceList
          services={this.props.services}
          favorites={this.props.favorites}
          addFavorite={this.props.addFavorite}
        />
        <Footer />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  services: state.service.services,
  favorites: state.service.favorites,
});

export default connect(
  mapStateToProps,
  {
    fetchAllServices,
    fetchFavorites,
    addFavorite,
  }
)(Explore);
