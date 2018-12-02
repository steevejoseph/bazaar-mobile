import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';

class CategoryCard extends Component {
  onRowPress() {
    console.log();
  }

  render() {
    const { title, description } = this.props;
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity>
          <Card title={title} image={{ uri: 'http://www.alpineworld.com.au/wp-content/uploads/2014/12/sts3069.jpg' }}>
            <Text style={{ marginBottom: 10 }}>{description}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // height: 150,
    // width: 200,
  },
};

export { CategoryCard };
