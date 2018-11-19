import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from '../common';

class ServiceView extends Component {
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

export default ServiceView;
