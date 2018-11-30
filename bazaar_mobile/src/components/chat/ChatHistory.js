import React, { Component } from 'react';
import { Text, View, Linking, ScrollView, FlatList, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner, Header, Footer, Input } from '../common';

// const i = 0;
// const msg = [
//   {
//     senderId: 'nini',
//     text: 'Hi there',
//   },
//   {
//     senderId: 'rando',
//     text: 'oh hey',
//   },
//   {
//     senderId: 'nini',
//     text: 'ur shoes untied',
//   },
// ];

class ChatHistory extends Component {
  constructor(props) {
    console.log(props.currentUser);
    super(props);

    this.state = {
      roomId: props.roomId,
      messages: [],
      textToSend: '',
    };
  }

  componentWillMount() {
    // this.setState({ messages: [] });
    const roomId = this.state.roomId;

    this.props.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message],
            });
          },
        },
      })
      .then(room => {
        this.setState({ roomId: room.id });
      })
      .catch(err => console.log('error on subscribing to room', err));
  }

  sendMessage() {
    if (!this.state.textToSend || this.state.textToSend.length < 1) {
      return;
    }
    this.props.currentUser
      .sendMessage({
        text: this.state.textToSend,
        roomId: this.state.roomId,
      })
      .then(messageId => {
        console.log(`Added message`);
      })
      .catch(err => {
        console.log(`Error adding message: ${err}`);
      });
  }

  renderMessages() {
    // console.log(this.props.roomId);
    return (
      <View>
        <FlatList
          style={{ backgroundColor: '#f8f8f8' }}
          data={this.state.messages}
          // data={msg}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()} // TODO: make KeyExtractor pull service ID.
        />
      </View>
    );
  }

  renderItem(message) {
    let messageText;
    if (message.item.senderId === this.props.currentUser.id) {
      messageText = `Me: ${message.item.text}`;
    } else {
      messageText = `Them: ${message.item.text}`;
    }

    return (
      <CardSection>
        <Text>{messageText}</Text>
      </CardSection>
    );
  }

  render() {
    const { scrollViewStyle, placeholderStyle } = styles;
    return (
      <Card>
        <ScrollView style={{ backgroundColor: '#f8f8f8' }}>{this.renderMessages()}</ScrollView>
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="Enter message"
          onChangeText={text => this.setState({ textToSend: text })}
        />
        <Button onPress={this.sendMessage.bind(this)}>Send</Button>
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

export default ChatHistory;
