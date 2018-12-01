import React, { Component } from 'react';
import { Text, View, Linking, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import { fetchJoinableRooms } from '../../actions';

class Inbox extends Component {
  renderItem(roomItem) {
    const room = roomItem.item;
    return (
      <TouchableOpacity onPress={() => Actions.ChatHistory({ roomId: room.id, currentUser: this.props.currentUser })}>
        <Text>{room.name}</Text>
      </TouchableOpacity>
    );
  }

  renderRooms() {
    if (!this.props.currentUser.rooms || this.props.currentUser.rooms.length < 1) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.placeholderStyle}>You have no messages.</Text>
        </View>
      );
    }

    return (
      <FlatList
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
