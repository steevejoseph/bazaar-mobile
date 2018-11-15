import React, { Component } from 'react';
import { Text, View, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Header, Footer } from '../common';
// import { emailChanged, passwordChanged, loginUser } from '../../actions';

class Profile extends Component {
  render() {
    const { firstName, lastName, email } = this.props.user;
    const { infoTextStyle, infoContainerStyle, userTextStyle } = styles;
    return (
      <Card>
        <ScrollView>
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
    // alignItems: 'flex-end',
  },
  infoTextStyle: {
    // flex: 1,
    flexDirection: 'row',
    color: '#000',
    fontSize: 16,
    // textAlign: 'left',
    fontWeight: '600',
    // alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
    // backgroundColor: 'orange',
    width: 80,
  },
  userTextStyle: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'left',
    marginLeft: 20,
    // marginRight: 5,

    // paddingLeft: 35,
    // backgroundColor: 'orange',
    paddingTop: 10,
    paddingBottom: 10,
    // opacity: 0.75,
    fontWeight: '800',
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
