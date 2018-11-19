import React, { Component } from 'react';
import { Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input } from '../common';
import { editService } from '../../actions';

class ServiceEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceName: this.props.service.name,
      serviceDescription: this.props.service.description,
      serviceTags: this.props.service.tags,
      serviceOwner: this.props.service.owner,
      serviceId: this.props.service._id,
    };
  }

  onSaveButtonPress() {
    const service = {
      name: this.state.serviceName,
      description: this.state.serviceDescription,
      tags: this.state.serviceTags,
      owner: this.state.serviceOwner,
      id: this.state.serviceId,
    };

    this.props.editService(service);
  }

  render() {
    const { service } = this.props;
    const { serviceName, serviceDescription } = this.state;
    const { cardSectionStyle, serviceFieldStyle, serviceValueStyle } = styles;
    return (
      <Card>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Name:</Text>
          <Input
            style={{ flexDirection: 'row', flex: 1 }}
            value={serviceName}
            onChangeText={text => this.setState({ serviceName: text })}
          />
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Text style={serviceFieldStyle}>Description:</Text>
          <Input
            style={{ flexDirection: 'row', flex: 1 }}
            placeholder="Description"
            value={serviceDescription}
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

        <Button onPress={this.onSaveButtonPress.bind(this)}>Save</Button>
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
  { editService }
)(ServiceEdit);
