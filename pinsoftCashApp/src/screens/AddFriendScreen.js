import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        },

        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <View>
      <TextInput
        placeholder='Enter Your Friends Id'
        value={Id}
        onChangeText={(text) => {
          setId(text);
        }}
      ></TextInput>
      <TouchableOpacity onPress={handleAddFriend}>
        <Text>Add Friend</Text>
      </TouchableOpacity>
      <Text>your user id : {userId}</Text>
    </View>
  );
};

export default AddFriendScreen;
