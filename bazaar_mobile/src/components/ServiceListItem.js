import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, Button } from 'react-native-elements';
import Markdown from 'react-native-markdown-renderer';
import { CardSection } from './common';
import { CATEGORIES } from '../constants';

class ServiceListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: props.isFavorite };
  }

  onRowPress() {
    Actions.ServiceView({
      service: this.props.service.item,
      isFavorite: this.state.isFavorite,
      addFavorite: this.props.addFavorite,
      updateParents: this.update.bind(this),
    });
  }

  update(newState) {
    this.setState(newState);
  }

  firstPhotoUrl() {
    const service = this.props.service.item;
    const photos = this.props.service.item.photos;
    if (photos && photos[0]) {
      return photos[0];
    }

    // else return stock photo
    for (let i = 0; i < CATEGORIES.length; i += 1) {
      // if (i === 5) {
      //   console.log(CATEGORIES[5]);
      //   console.log(`service tag: ${service.tags}`);
      // }

      if (CATEGORIES[i].title == service.tags) {
        return CATEGORIES[i].url;
      }
    }

    return 'http://www.alpineworld.com.au/wp-content/uploads/2014/12/sts3069.jpg';
  }

  render() {
    const { name, description } = this.props.service.item;
    const textStyle = [styles.titleStyle];
    if (this.state.isFavorite) textStyle.push(styles.favoriteStyle);

    return (
      <View style={{ flex: 2 }}>
        <Card title={name} image={{ uri: this.firstPhotoUrl() }}>
          {/* <Text style={{ marginBottom: 10 }}>{description}</Text> */}
          <Markdown>{`${description}`}</Markdown>
          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title="VIEW NOW"
            onPress={this.onRowPress.bind(this)}
          />
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  favoriteStyle: {
    fontWeight: 'bold',
    color: '#FF2E6D',
  },
};

export default ServiceListItem;
