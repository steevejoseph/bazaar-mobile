import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, TextInput } from 'react-native';
import { Rating, Button } from 'react-native-elements';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Card, Input, CardSection } from '../common';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateing: null,
      comment: '',
    };
  }

  onCommentTextChange(text) {
    this.setState({ comment: text });
  }

  ratingCompleted(rating) {
    this.setState({ rateing: rating });
  }

  submitReview() {
    const { user, service } = this.props;
    const { comment, rateing } = this.state;
    if (comment.length > 0 && rateing !== null && rateing >= 0 && rateing <= 5) {
      // console.log(`rating: ${rateing}`);
      // console.log(`comment: ${comment}`);
      axios
        .post(`${ROOT_URL}/services/createComment`, {
          serviceId: service._id,
          comment,
          rateing,
        })
        .then(res => {
          // couldn't get the page to re-render with the new comment :/
          Actions.Explore({ type: 'reset' });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { createReviewContainerStyle } = styles;
    return (
      <Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: '#fff',
            borderColor: '#ddd',
            position: 'relative',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 5,
              marginBottom: 10,
            }}
          >
            {`Review of "${this.props.service.name}"`}
          </Text>
          <View>
            <Rating
              //   showRating
              type="custom"
              fractions={1}
              startingValue={0}
              //   readonly
              imageSize={30}
              onFinishRating={rating => this.ratingCompleted(rating)}
              //   onStartRating={this.ratingStarted}
              //   style={{ paddingVertical: 10 }}
              //   ratingColor="#008489"
              ratingBackgroundColor="#cbd3e3"
              ratingTextColor="#cbd3e3"
            />
          </View>
          <View style={{ height: 75, flexDirection: 'column', justifyContent: 'flex-start' }}>
            <TextInput
              autoCorrect={false}
              placeholder="What did you like or dislike?"
              value={this.state.comment}
              onChangeText={this.onCommentTextChange.bind(this)}
              multiline
              numberOfLines={10}
              style={{ height: '100%' }}
            />
          </View>
          <View>
            <Button
              title="Submit Review"
              onPress={this.submitReview.bind(this)}
              buttonStyle={{ marginLeft: 0, backgroundColor: '#dc3545' }}
            />
          </View>
        </View>
      </Card>
    );
  }
}

const styles = {
  createReviewContainerStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};

export default CreateReview;
