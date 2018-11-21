import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import { Card, CardSection, Button } from '../common';
import { deleteService } from '../../actions';

const images = [
  'https://images.unsplash.com/photo-1414611091494-9dc36f7730b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00b1a6b38677f1706416fdeecb5d7551&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1535448996690-4277028bb0e5?ixlib=rb-0.3.5&s=c47e010362a29f057ea3bcd6aac3bfc4&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f75361bb535d798b9936d0b3f53e9cd3&auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11be05062d1f7ba80ca7d217e0aa241f&auto=format&fit=crop&w=500&q=60',
];

const getImg = () =>
  images.map(img => (
    <View key={img}>
      {/* <Text>Hi</Text> */}
      <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: img }} />
    </View>
  ));

class MyServiceView extends Component {
  onDelete() {
    this.props.deleteService(this.props.service._id);
  }

  onEdit() {
    Actions.ServiceEdit({ service: this.props.service });
  }

  getImg(photos) {
    return photos.map(photo => (
      <View key={photo}>
        {/* <Text>Hi</Text> */}
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

        <Button onPress={this.onEdit.bind(this)}>Edit</Button>
        <Button onPress={this.onDelete.bind(this)}>Delete</Button>
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

export default connect(
  null,
  { deleteService }
)(MyServiceView);
