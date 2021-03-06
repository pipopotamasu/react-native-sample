/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import TodoInput from './src/component/TodoInput';
import TodoItem from './src/component/TodoItem';
import Store from 'react-native-store';

const DB = {
    'list': Store.model('list')
}


export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // Return all items
    DB.list.find().then(resp => {
      console.log(resp);
      if(resp === null) return true

      const list = [].concat(this.state.list);

      resp.forEach((todo) => {
        list.push(todo)
      });

      this.setState({
        list,
      });
    });
  }

  _delete = (index) => () => {
    const list = [].concat(this.state.list);
    list.splice(index, 1);
    if(this.state.list[index]._id != undefined) {
      DB.list.removeById(this.state.list[index]._id);
    }

    this.setState({
      list,
    });
  }

  _done = (index) => () => {
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;

    this.setState({
      list,
    });
  }

  _onPress = (text) => {
    const list = [].concat(this.state.list);

    list.push({
      key: Date.now(),
      text: text,
      done: false,
    });

    this.setState({
      list,
    });
  }

  _onSave = () => {
    this.state.list.forEach((todo) => {
      if(todo._id != undefined) delete todo._id;
      console.log(todo)
      DB.list.add(todo);
    });
  }

  render() {
    const {
      list,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TodoInput onPress={this._onPress} onSave={this._onSave} />
          <View style={styles.todoListContainer}>
            <FlatList
              style={styles.todoList}
              data={list}
              renderItem={({ item, index }) => (
                <TodoItem
                  onDone={this._done(index)}
                  onDelete={this._delete(index)}
                  {...item}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 40,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
  },
  todoListContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});
