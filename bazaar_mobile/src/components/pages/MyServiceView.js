import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Button } from '../common';
import {deleteService} from '../../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class MyServiceView extends Component {

  onButtonPress() {
    this.props.deleteService(this.props.service._id);
    Actions.MyServices({ type: 'reset' });
  }


  render() {
    const { service } = this.props;
    const { cardSectionStyle, serviceFieldStyle, serviceValueStyle } = styles;
    return (
      <Card>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Name:</Text>
          <Text style={serviceValueStyle}>{service.name}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Description:</Text>
          <Text style={serviceValueStyle}>{service.description}</Text>
        </CardSection>

        <Button onPress={this.onButtonPress.bind(this)}>Delete</Button>
      </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  serviceFieldStyle: {
    flexDirection: 'row',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
    width: 90,
  },
  serviceValueStyle: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'left',
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '800',
  },
};

export default  connect(null, {deleteService})(MyServiceView);