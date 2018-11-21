import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-carousel';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { Card, CardSection, Button } from '../common';
import { deleteService } from '../../actions';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

const options = {
  title: 'Select a Picture',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class MyServiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicePhoto: '',
    };
  }

  onDelete() {
    this.props.deleteService(this.props.service._id);
  }

  onEdit() {
    Actions.ServiceEdit({ service: this.props.service });
  }

  getImg(photos) {
    return photos.map(photo => (
      <View key={photo}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo }} />
      </View>
    ));
  }

  submitPhoto() {
    const serviceId = this.props.service._id;
    const servicePhoto = this.state.servicePhoto;

    axios
      .post(`${ROOT_URL}/photos/service/${serviceId}/create`, servicePhoto)
      .then(res => {
        console.log(res);
        Actions.MyServices({ type: 'reset' });
      })
      .catch(err => console.log(err));
  }

  renderImagePicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response from ImagePicker = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({
          servicePhoto: '',
        });
      } else {
        const source = { uri: response.uri };

        const formData = new FormData();
        formData.append('image', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });

        this.setState({
          servicePhoto: formData,
        });
      }
    });
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

  renderUploadButton() {
    if (this.state.servicePhoto !== '') {
      return <Button onPress={this.submitPhoto.bind(this)}>Upload image</Button>;
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

        <Button onPress={this.renderImagePicker.bind(this)}>Choose image</Button>
        {this.renderUploadButton()}

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
