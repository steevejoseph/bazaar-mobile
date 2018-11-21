import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Carousel from 'react-native-carousel';
import { Card, CardSection } from '../common';

class ServiceView extends Component {
  getImg(photos) {
    return photos.map(photo => (
      <View key={photo}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo }} />
      </View>
    ));
  }

  renderPhotos() {
    if (this.props.service.photos) {
      return (
        <Carousel loop animate hideIndicators delay={4000}>
          {this.getImg(this.props.service.photos)}
        </Carousel>
      );
    }

    // TODO: add else clause returning stock pic.
  }

  render() {
    const { service } = this.props;
    const { cardSectionStyle, serviceFieldStyle, serviceValueStyle } = styles;
    return (
      <Card>
        {this.renderPhotos()}
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Name:</Text>
          <Text style={serviceValueStyle}>{service.name}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Description:</Text>
          <Text style={serviceValueStyle}>{service.description}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Category:</Text>
          <Text style={serviceValueStyle}>{service.tags}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Price:</Text>
          <Text style={serviceValueStyle}>${service.price}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Owner:</Text>
          <Text style={serviceValueStyle}>{service.owner}</Text>
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
