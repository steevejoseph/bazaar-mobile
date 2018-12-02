import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';
import { Card, Footer } from '../common';

class ChatHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: props.roomId,
      messages: [],
    };
  }

  componentDidMount() {
    const roomId = this.state.roomId;

    this.props.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState(prevState => ({
              messages: GiftedChat.append(prevState.messages, message),
            }));
          },
        },
      })
      .catch(err => console.log('error on subscribing to room', err));
  }

  onSend(messages = []) {
    const message = messages[0];

    this.props.currentUser
      .sendMessage({
        text: message.text,
        roomId: this.state.roomId,
      })
      .then(messageId => {
        // console.log(`Added message`);
      })
      .catch(err => {
        console.log(`Error adding message: ${err}`);
      });
  }

  renderMessages() {
    const messages = this.state.messages.map(message => {
      console.log();
      return {
        _id: `${message.id}`,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: `${message.senderId}`,
        },
      };
    });

    return (
      <GiftedChat
        messages={messages}
        user={{
          _id: `${this.props.currentUser.id}`,
        }}
        loadEarlier
        onSend={messageArray => this.onSend(messageArray)}
      />
    );
  }

  render() {
    return (
      <Card>
        {this.renderMessages()}
        <Footer />
      </Card>
    );
  }
}

export default ChatHistory;
