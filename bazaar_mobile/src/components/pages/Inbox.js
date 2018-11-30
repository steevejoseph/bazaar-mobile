import React, { Component } from 'react';
import { Text, View, Linking, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import { fetchJoinableRooms } from '../../actions';

class Inbox extends Component {
  constructor(props) {
    // console.log(props.currentUser.rooms);
    super(props);
    this.state = {
      rooms: [],
    };
  }

  // componentDidMount() {
  //   this.props.fetchJoinableRooms(this.props.currentUser);
  // }

  renderItem(roomItem) {
    const room = roomItem.item;
    // console.log(room);
    return (
      <TouchableOpacity onPress={() => Actions.ChatHistory({ roomId: room.id, currentUser: this.props.currentUser })}>
        <Text>{room.name}</Text>
      </TouchableOpacity>
    );
  }

  renderRooms() {
    console.log(this.props.currentUser.rooms);
    if (!this.props.currentUser.rooms || this.props.currentUser.rooms.length < 1) {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.placeholderStyle}>You have no messages.</Text>
        </View>
      );
    }

    return (
      <FlatList
        // style={{ backGroundColor: '#f8f8f8' }}
        data={this.props.currentUser.rooms}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  render() {
    return (
      <Card>
        {this.renderRooms()}
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
  currentUser: state.chat.currentUser,
  joinableRooms: state.chat.joinableRooms,
});

export default connect(
  mapStateToProps,
  { fetchJoinableRooms }
)(Inbox);
