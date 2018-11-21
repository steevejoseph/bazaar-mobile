import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { emailChanged, passwordChanged, loginUser, firstNameChanged, lastNameChanged, signupUser } from '../../actions';

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, firstName, lastName } = this.props;
    this.props.signupUser({ firstName, lastName, email, password });
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Signup</Button>;
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="John"
            onChangeText={this.onFirstNameChange.bind(this)}
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Smith"
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.lastName}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  loading: state.auth.loading,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
});

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
    firstNameChanged,
    lastNameChanged,
    signupUser,
  }
)(SignupForm);

// export default SignupForm;
