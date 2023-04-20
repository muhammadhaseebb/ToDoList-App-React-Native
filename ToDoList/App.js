/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [press, setPress] = useState();

  const handleNewTodo = () => {
    if (newTodo.trim() === '') return;

    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const deletetask = index => {
    let todoscopy = [...todos];
    todoscopy.splice(index, 1);
    setTodos(todoscopy);
  };

  const updatetask = (index, newtxt) => {
    setPress(index);
    setNewTodo(newtxt);
  };

  const handleupdate = () => {
    let todoscopy = [...todos];
    todoscopy[press] = newTodo;
    setTodos(todoscopy);
    setNewTodo('');
    setPress();
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar backgroundColor={'black'} />

      {/* textfield and button */}
      <View style={styles.navBar}>
        <Text style={{fontSize: 32, fontFamily: 'Billabong', paddingTop: 20}}>
          To Do List
        </Text>
      </View>
      <View style={styles.mainView}>
        <TextInput
          style={{width: '60%'}}
          mode="outlined"
          label="Enter an item"
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          right={
            <TextInput.Icon
              icon={
                press !== undefined ? 'archive-arrow-up' : 'archive-arrow-down'
              }
            />
          }
        />
        <Button
          style={styles.btn}
          onPress={press !== undefined ? handleupdate : handleNewTodo}
          textColor="white">
          {press !== undefined ? 'Update' : 'Add Item'}
        </Button>
      </View>

      {/* Output tiles */}
      <ScrollView>
        {todos.map((todo, index) => (
          <View key={index} style={styles.output}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.txt}>{index + 1}</Text>
              <TouchableOpacity
                key={index}
                onPress={() => updatetask(index, todo)}>
                <Text
                  key={index}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    maxWidth: 190,
                  }}>
                  {todo}
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              icon="delete"
              key={index}
              onPress={() => deletetask(index)}></Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'black',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  btn: {
    backgroundColor: 'black',
    height: 40,
    paddingHorizontal: 20,
  },
  output: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },
  txt: {
    color: 'white',
    marginHorizontal: 20,
    backgroundColor: 'black',
    width: 20,
    height: 20,
    textAlign: 'center',
  },
});
