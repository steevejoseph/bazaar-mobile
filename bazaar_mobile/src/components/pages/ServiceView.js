import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import { createRoom } from '../../actions';

class ServiceView extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: props.isFavorite };
  }

  onFavorite() {
    const { isFavorite } = this.state;
    const { service } = this.props;
    const newState = { isFavorite: !isFavorite };

    if (isFavorite) {
      // TODO: remove from favorites
    } else this.props.addFavorite(service._id);

    this.setState(newState);
    this.props.updateParents(newState);
  }

  getImg(photos) {
    return photos.map(photo => (
      <View key={photo}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo }} />
      </View>
    ));
  }

  handleMessageSeller() {
    console.log('seller messaged!');
    const roomName = `${this.props.user.firstName} - ${this.props.service.name}`;
    const currentUser = this.props.currentUser;

    // open room if already made
    for (let i = 0; i < currentUser.rooms.length; i += 1) {
      if (currentUser.rooms[i].name === roomName) {
        // this.props.history.push(`/messages/${this.props.currentUser.rooms[i].id}`);
        Actions.ChatHistory({ roomId: currentUser.rooms[i].id, currentUser });
        return;
      }
    }

    // create room if else.
    this.props.createRoom(currentUser, this.props.service.owner, roomName, Actions.ChatHistory);
  }

  renderMessageSeller() {
    if (this.props.service.owner !== this.props.user._id) {
      return <Button onPress={this.handleMessageSeller.bind(this)}>Message Seller</Button>;
    }
  }

  renderPhotos() {
    const { photos } = this.props.service;

    if (photos) {
      return (
        <Carousel loop animate hideIndicators delay={4000}>
          {this.getImg(photos)}
        </Carousel>
      );
    }

    // TODO: add else clause returning stock pic.
  }

  render() {
    const { isFavorite } = this.state;
    const { service } = this.props;
    const { cardSectionStyle, serviceFieldStyle, serviceValueStyle } = styles;
    const favoriteText = isFavorite ? 'Un-Favorite' : 'Favorite';

    return (
      <Card>
        {this.renderPhotos()}
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Name:</Text>
          <Text style={serviceValueStyle}>{service.name}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Description:</Text>
          <Text style={serviceValueStyle}>{service.description}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Category:</Text>
          <Text style={serviceValueStyle}>{service.tags}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Price:</Text>
          <Text style={serviceValueStyle}>${service.price}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Owner:</Text>
          <Text style={serviceValueStyle}>{service.owner}</Text>
        </CardSection>
        <Button style={{ marginBottom: 5 }} onPress={this.onFavorite.bind(this)}>
          {favoriteText}
        </Button>
        <Button style={{ backgroundColor: '#dc3545', marginBottom: 10 }}>Interested</Button>
        {this.renderMessageSeller()}
      </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  serviceFieldStyle: {
    flexDirection: 'row',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
    width: 90,
  },
  serviceValueStyle: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'left',
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '800',
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
  currentUser: state.chat.currentUser,
});

export default connect(
  mapStateToProps,
  { createRoom }
)(ServiceView);
