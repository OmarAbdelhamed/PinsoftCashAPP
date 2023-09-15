import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';
const AddFriendScreen = () => {
  const [Id, setId] = useState('');

  const token = useSelector((state) => state.cash.token);
  const userId = useSelector((state) => state.cash.userId);
  createAxiosInterceptor(api, token);

  const handleAddFriend = () => {
    api
      .post(`/users/add-friends/${Id}`)

      .then(
        (response) => {
          console.log(response.data);
          alert('friend Added');
        },

        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter Your Friends Id'
        value={Id}
        onChangeText={(text) => {
          setId(text);
        }}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
        <Text style={styles.text}>Add Friend</Text>
      </TouchableOpacity>
      <Text style={styles.text2}>your user id :</Text>
      <Text style={styles.inputID}>{userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputID: {
    width: 300,
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
  },
  button: {
    marginTop: 1,
    backgroundColor: '#2345df',
    fontSize: 20,
    color: 'white',
    borderRadius: 2,
    padding: 10,
  },
  text: {
    color: 'white',
  },
  text2: {
    color: 'black',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    marginTop: 30,
  },
});

export default AddFriendScreen;
