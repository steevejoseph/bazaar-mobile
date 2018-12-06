import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import { connect } from 'react-redux';
import axios from 'axios';
import Markdown from 'react-native-markdown-renderer';
import { Avatar, Badge, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection } from '../common';
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
    // console.log('seller messaged!');
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
    const favoriteText = this.state.isFavorite ? 'Un-Favorite' : 'Favorite';

    if (this.props.service.owner !== this.props.user._id) {
      return (
        <View style={styles.viewStyle}>
          <Text style={{ marginBottom: 10, marginLeft: 10, fontWeight: 'bold' }}>${this.props.service.price}</Text>
          <Button
            buttonStyle={{ marginTop: 5, marginBottom: 5, backgroundColor: '#fb3b30' }}
            onPress={this.onFavorite.bind(this)}
            title={favoriteText}
          />
          <Button
            clear
            title="Message Seller"
            onPress={this.handleMessageSeller.bind(this)}
            buttonStyle={{ marginTop: 5, marginBottom: 5, backgroundColor: '#dc3545' }}
          />
        </View>
      );
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
        <CardSection style={styles.ratingsContainerStyle}>
          <Text style={{ marginLeft: 5, marginBottom: 10 }}>Reviews ({comments.length})</Text>
          <Button
            buttonStyle={{ marginTop: 5, marginBottom: 5, backgroundColor: '#dc3545', alignSelf: 'flex-end' }}
            onPress={() =>
              Actions.CreateReview({
                user: this.props.user,
                service: this.props.service,
              })
            }
            title="Add A Review"
          />
          <FlatList
            data={this.state.comments}
            renderItem={this.renderCommentItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        </CardSection>
      );
    }

    return (
      <CardSection style={styles.ratingsContainerStyle}>
        <Text style={{ marginLeft: 5 }}> No reviews yet.</Text>
        <Button
          buttonStyle={{ marginTop: 5, marginBottom: 5, backgroundColor: '#dc3545', alignSelf: 'flex-end' }}
          onPress={() =>
            Actions.CreateReview({
              user: this.props.user,
              service: this.props.service,
            })
          }
          title="Add A Review"
        />
      </CardSection>
    );
  }

  render() {
    const { service } = this.props;
    const { serviceTagStyle, serviceNameStyle, serviceOwnerStyle, serviceDescriptionContainerStyle } = styles;
    const serviceOwner = this.state.serviceOwner;
    return (
      <Card>
        <ScrollView style={{ flex: 1 }}>
          {this.renderPhotos()}
          <CardSection style={styles.cardSectionStyle}>
            <Text style={serviceNameStyle}>{service.name}</Text>
            <Text style={serviceTagStyle}>{service.tags}</Text>
            <View style={{ marginLeft: 5 }}>
              <Icon
                name="heart"
                backgroundColor="#ddd"
                color={this.state.isFavorite ? 'red' : 'grey'}
                onPress={this.onFavorite.bind(this)}
                size={20}
                iconStyle={{ marginRight: 0, color: '#000' }}
              />
            </View>

            <Avatar
              medium
              rounded
              source={{
                uri:
                  'http://meridianpm.us/wp-content/uploads/2016/05/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon-300x300.jpg',
              }}
              // onPress={() => console.log('Works!')}
              activeOpacity={0.7}
              containerStyle={{ alignSelf: 'flex-end', marginRight: 20 }}
            />
            <TouchableOpacity onPress={this.onOwnerPress.bind(this)}>
              <Text style={serviceOwnerStyle}>{`${serviceOwner.firstName}  ${serviceOwner.lastName}`}</Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection style={{ justifyContent: 'flex-start' }}>
            <View style={serviceDescriptionContainerStyle}>
              <Markdown>{`${service.description}`}</Markdown>
            </View>
          </CardSection>
          {this.renderComments()}
        </ScrollView>
        {this.renderMessageSeller()}
      </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  serviceNameStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  serviceDescriptionStyle: {
    marginLeft: 5,
  },
  serviceTagStyle: {
    fontSize: 14,
    marginLeft: 5,
  },
  serviceOwnerStyle: {
    // flex: 1,
    color: '#333',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginRight: 5,
    // textAlign: 'left',
    // marginLeft: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // fontWeight: '800',
  },

  serviceDescriptionContainerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },

  ratingsContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomWidth: 0,
  },

  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'space-around',
    height: 50,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    position: 'relative',
    shadowRadius: 10,
    shadowColor: '#000',
    elevation: 10,
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
