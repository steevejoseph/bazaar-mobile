import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ServiceListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: props.isFavorite };
  }

  update(newState) {
    this.setState(newState);
  }

  onRowPress() {
    Actions.ServiceView({
      service: this.props.service.item,
      isFavorite: this.state.isFavorite,
      addFavorite: this.props.addFavorite,
      updateParents: this.update.bind(this),
    });
  }

  render() {
    const name = this.props.service.item.name;
    const textStyle = [styles.titleStyle];
    if (this.state.isFavorite) textStyle.push(styles.favoriteStyle);

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={textStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
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
