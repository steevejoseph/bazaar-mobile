import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class MyServiceListItem extends Component {
  onRowPress() {
    Actions.MyServiceView({ service: this.props.service.item });
  }

  onDelete() {
    this.props.deleteService(this.props.service.item._id);
    Actions.MyServices();
  }

  render() {
    const name = this.props.service.item.name;
    return (
      <View style={styles.rowStyle}>
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View style={styles.stretchStyle}>
            <CardSection>
              <Text style={styles.titleStyle}>{name}</Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
        {/* <Button onPress={this.onDelete.bind(this)}>
          Delete
        </Button> */}
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
  stretchStyle: {
    flexGrow: 1
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
  },
};

export default MyServiceListItem;
