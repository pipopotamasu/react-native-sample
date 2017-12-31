import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  textInput: {
    flex: 3,
    backgroundColor: '#FFF',
    marginRight: 5,
  },
  button: {
    flex: 1,
    backgroundColor: '#008080',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonSave: {
    backgroundColor: '#4169E1',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
  }
});

export default class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  _onPress = () => {
    this.props.onPress(this.state.text);
    this.setState({text: ''});
  }

  _onSave = () => {
    this.props.onSave();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this._onPress}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSave]}
          onPress={this._onSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
