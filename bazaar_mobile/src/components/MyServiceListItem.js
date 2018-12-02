import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, Button } from 'react-native-elements';

class MyServiceListItem extends Component {
  onRowPress() {
    Actions.MyServiceView({ service: this.props.service.item });
  }

  onDelete() {
    this.props.deleteService(this.props.service.item._id);
    Actions.MyServices();
  }

  render() {
    const { name, description } = this.props.service.item;
    return (
      <Card title={name} image={{ uri: 'http://www.alpineworld.com.au/wp-content/uploads/2014/12/sts3069.jpg' }}>
        <Text style={{ marginBottom: 10 }}>{description}</Text>
        <Button
          backgroundColor="#03A9F4"
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title="VIEW NOW"
          onPress={this.onRowPress.bind(this)}
        />
      </Card>
    );
  }
}

export default MyServiceListItem;
