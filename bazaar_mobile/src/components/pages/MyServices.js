import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
class MyServices extends Component {
  onButtonPress() {
    console.log(`MyServices props: ${this.props}`);
    // const name = 'Hello from React Native!';
    // const description = 'Created service from mobile.';
    // const tags = 'axios, post, service, create';
    // const owner = this.props.user._id;
    // axios
    //   .post(`${ROOT_URL}/services/create`, { name, description, tags, owner })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.log("something's wrong here!"));
  }

  render() {
    const { scrollViewStyle, placeholderStyle } = styles;
    return (
      <Card>
        <ScrollView style={{ backgroundColor: '#f8f8f8' }} contentContainerStyle={scrollViewStyle}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={placeholderStyle}>You have no services.</Text>
          </View>
        </ScrollView>
        {/* @Steeve: figure out why this doesn't work with .bind(), only without */}
        <Button style={{ backgroundColor: 'red' }} onButtonPress={this.onButtonPress.bind(this)}>
          Create Service
        </Button>
        <Footer footerText="" />
      </Card>
    );
  }
}

const styles = {
  scrollViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  placeholderStyle: {
    color: '#333',
    opacity: 0.25,
    fontSize: 16,
    fontWeight: '600',
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  {}
)(MyServices);
