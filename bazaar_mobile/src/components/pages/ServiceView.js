import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import { connect } from 'react-redux';
import axios from 'axios';
import Markdown from 'react-native-markdown-renderer';
import { Card, CardSection, Button } from '../common';
import { createRoom } from '../../actions';
import ServiceComment from '../service/ServiceComment';
import { CATEGORIES } from '../../constants';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

class ServiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.isFavorite,
      comments: [],
      serviceOwner: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  }

  componentWillMount() {
    axios
      .get(`${ROOT_URL}/users/${this.props.service.owner}`)
      .then(response => {
        console.log(response);
        this.setState({ serviceOwner: response.data.user });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    axios
      .get(`${ROOT_URL}/services/${this.props.service._id}`)
      .then(res => {
        // console.log(res);
        this.setState({ comments: res.data.comments });
      })
      .catch(err => console.log(err));
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

  onOwnerPress() {
    Actions.UserView({ owner: this.state.serviceOwner });
  }

  getStockPhotoUrl() {
    const service = this.props.service;

    // else return stock photo
    for (let i = 0; i < CATEGORIES.length; i += 1) {
      if (CATEGORIES[i].title == service.tags) {
        return CATEGORIES[i].url;
      }
    }

    return 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
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

  renderCommentItem(commentItem) {
    const comment = commentItem.item;
    return <ServiceComment comment={comment} />;
  }

  renderMessageSeller() {
    if (this.props.service.owner !== this.props.user._id) {
      return <Button onPress={this.handleMessageSeller.bind(this)}>Message Seller</Button>;
    }
  }

  renderPhotos() {
    const { photos } = this.props.service;

    if (photos && photos.length >= 1) {
      return (
        <View style={{ flex: 1, backgroundColor: 'red', width: 375, height: 225 }}>
          <Carousel loop={false} animate={false} hideIndicators={false} delay={4000} width="100%" height="100%">
            {photos.map(photo => (
              // <View>
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: photo }} />
              // </View>
            ))}
          </Carousel>
        </View>
      );
    }

    return (
      <View>
        <Image
          style={{ width: 375, height: 225 }}
          source={{
            uri: this.getStockPhotoUrl(),
          }}
        />
      </View>
    );
  }

  renderComments() {
    const comments = this.state.comments;
    if (comments && comments.length >= 1) {
      return (
        <View>
          <Text>Ratings ({comments.length})</Text>
          <FlatList
            data={this.state.comments}
            renderItem={this.renderCommentItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }

  render() {
    const { isFavorite } = this.state;
    const { service } = this.props;
    const { cardSectionStyle, serviceFieldStyle, serviceValueStyle } = styles;
    const favoriteText = isFavorite ? 'Un-Favorite' : 'Favorite';
    const serviceOwner = this.state.serviceOwner;
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderPhotos()}
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Name:</Text>
          <Text style={serviceValueStyle}>{service.name}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Description:</Text>
          <View style={{ width: '75%' }}>
            <Markdown>{`${service.description}`}</Markdown>
          </View>
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
          <TouchableOpacity onPress={this.onOwnerPress.bind(this)}>
            <Text style={serviceValueStyle}>{`${serviceOwner.firstName}  ${serviceOwner.lastName}`}</Text>
          </TouchableOpacity>
        </CardSection>
        {this.renderComments()}
        <Button style={{ marginBottom: 5 }} onPress={this.onFavorite.bind(this)}>
          {favoriteText}
        </Button>
        {this.renderMessageSeller()}
      </ScrollView>
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
