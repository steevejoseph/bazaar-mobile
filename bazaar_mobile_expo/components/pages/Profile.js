import React, { Component } from 'react';
import { Text, View, Linking, ScrollView, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Carousel from 'react-native-carousel';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
import { loadUserProfile } from '../../actions';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

const options = {
  title: 'Select a Picture',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhoto: '',
    };
  }

  componentWillMount() {
    this.props.loadUserProfile(this.props.user._id);
  }

  getImg(photos) {
    return photos.map(photo => (
      <View key={photo}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: photo }} />
      </View>
    ));
  }

  submitPhoto() {
    const userId = this.props.user._id;
    const userPhoto = this.state.userPhoto;

    axios
      .post(`${ROOT_URL}/photos/user/${userId}/create`, userPhoto)
      .then(res => {
        console.log(res);
        Actions.Profile({ type: 'reset' });
      })
      .catch(err => console.log(err));
  }

  renderImagePicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response from ImagePicker = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({
          userPhoto: '',
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
          userPhoto: formData,
        });
      }
    });
  }

  renderPhotos() {
    if (this.props.user.photos) {
      return (
        <Carousel loop animate hideIndicators delay={4000}>
          {this.getImg(this.props.user.photos)}
        </Carousel>
      );
    }

    // TODO: add else clause returning stock pic.
  }

  renderUploadButton() {
    if (this.state.userPhoto !== '') {
      return <Button onPress={this.submitPhoto.bind(this)}>Upload image</Button>;
    }
  }

  render() {
    const { firstName, lastName, email } = this.props.user;
    const { infoTextStyle, infoContainerStyle, userTextStyle } = styles;
    return (
      <Card>
        {this.renderPhotos()}
        <ScrollView style={{ backgroundColor: '#f8f8f8' }}>
          <CardSection style={infoContainerStyle}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={infoTextStyle}>First Name</Text>
              <Text style={userTextStyle}>{firstName}</Text>
            </View>
          </CardSection>
          <CardSection style={infoContainerStyle}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={infoTextStyle}>Last Name</Text>
              <Text style={userTextStyle}>{lastName}</Text>
            </View>
          </CardSection>
          <CardSection style={infoContainerStyle}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={infoTextStyle}>Email </Text>
              <Text style={[userTextStyle, { textAlign: 'left' }]}>{email}</Text>
            </View>
          </CardSection>
          {/* <CardSection style={infoContainerStyle}>
            <Text style={infoTextStyle}>Phone number:</Text>
          </CardSection> */}
          <Button onPress={this.renderImagePicker.bind(this)}>Choose image</Button>
          {this.renderUploadButton()}
        </ScrollView>
        <Button
          style={{ backgroundColor: 'red', marginBottom: 10, alignSelf: 'stretch' }}
          onPress={() => Actions.Landing({ type: 'reset' })}
        >
          Logout
        </Button>
        <Footer footerText="" />
      </Card>
    );
  }
}

const styles = {
  infoContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  infoTextStyle: {
    flexDirection: 'row',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
    width: 80,
  },

  userTextStyle: {
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

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  { loadUserProfile }
)(Profile);
