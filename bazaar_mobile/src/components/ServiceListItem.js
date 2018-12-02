import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, Button } from 'react-native-elements';
import { CardSection } from './common';

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

  render() {
    const { name, description } = this.props.service.item;
    const textStyle = [styles.titleStyle];
    if (this.state.isFavorite) textStyle.push(styles.favoriteStyle);

    return (
      <View style={{ flex: 2 }}>
        <Card title={name} image={{ uri: 'http://www.alpineworld.com.au/wp-content/uploads/2014/12/sts3069.jpg' }}>
          <Text style={{ marginBottom: 10 }}>{description}</Text>
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
