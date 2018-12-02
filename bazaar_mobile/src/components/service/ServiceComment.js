import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Rating, PricingCard } from 'react-native-elements';
import { CardSection } from '../common';

class ServiceComment extends Component {
  render() {
    return (
      <CardSection>
        <Rating
          //   showRating
          type="custom"
          fractions={1}
          startingValue={this.props.comment.rateing}
          //   readonly
          imageSize={30}
          //   onFinishRating={this.ratingCompleted}
          //   onStartRating={this.ratingStarted}
          //   style={{ paddingVertical: 10 }}
          //   ratingColor="#008489"
          ratingBackgroundColor="#cbd3e3"
          ratingTextColor="#cbd3e3"
        />
        <Text>{this.props.comment.comment}</Text>
      </CardSection>
    );
  }
}

export default ServiceComment;
