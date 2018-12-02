import React, { Component } from 'react';
import { Text, View, Linking, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import { fetchJoinableRooms } from '../../actions';

class Inbox extends Component {
  renderItem(roomItem) {
    const room = roomItem.item;
    const { messageContainerStyle, roomNameStyle } = styles;
    return (
      <TouchableOpacity onPress={() => Actions.ChatHistory({ roomId: room.id, currentUser: this.props.currentUser })}>
        <CardSection style={messageContainerStyle}>
          <Avatar
            medium
            rounded
            source={{
              uri:
                'http://meridianpm.us/wp-content/uploads/2016/05/depositphotos_133352102-stock-illustration-default-placeholder-profile-icon-300x300.jpg',
            }}
            // onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text style={roomNameStyle}>{room.name}</Text>
        </CardSection>
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

  messageContainerStyle: {
    borderBottomWidth: 0,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },

  roomNameStyle: {
    fontSize: 18,
    alignSelf: 'center',
    paddingLeft: 10,
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
