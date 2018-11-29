import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input } from '../common/index';
import { createService } from '../../actions';

class ServiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: '',
      serviceDescription: '',
      serviceTags: 'Business',
      serviceOwner: this.props.user._id,
    };
  }

  onButtonPress() {
    const { serviceName, serviceDescription, serviceTags, serviceOwner } = this.state;

    const service = {
      name: serviceName,
      description: serviceDescription,
      tags: serviceTags,
      owner: serviceOwner,
    };

    this.props.createService(service);
    Actions.MyServices({ type: 'reset' });
  }

  render() {
    return (
      <Card>
        <View>
          <CardSection>
            <Input
              label="Name"
              placeholder="Service Name"
              onChangeText={text => this.setState({ serviceName: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Description"
              placeholder="Description"
              onChangeText={text => this.setState({ serviceDescription: text })}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.pickerTextStyle}>Category</Text>
            <Picker
              selectedValue={this.state.serviceTags}
              onValueChange={(itemValue, itemIndex) => this.setState({ serviceTags: itemValue })}
            >
              <Picker.Item label="Graphics & Design" value="Graphics & Design" />
              <Picker.Item label="Digital Marketing" value="Digital Marketing" />
              <Picker.Item label="Writing & Translation" value="Writing & Translation" />
              <Picker.Item label="Video & Animation" value="Video & Animation" />
              <Picker.Item label="Music & Audio" value="Music & Audio" />
              <Picker.Item label="Programming & Tech" value="Programming & Tech" />
              <Picker.Item label="Fun & Lifestyle" value="Fun & Lifestyle" />
              <Picker.Item label="Lessons/Tutoring" value="Lessons/Tutoring" />
              <Picker.Item label="Event Management" value="Event Management" />
              <Picker.Item label="Beauty" value="Beauty" />
              <Picker.Item label="E-Commerce" value="E-Commerce" />
              <Picker.Item label="Photography" value="Photography" />
              <Picker.Item label="Business" value="Business" />
            </Picker>
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </CardSection>
        </View>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { createService }
)(ServiceCreate);
