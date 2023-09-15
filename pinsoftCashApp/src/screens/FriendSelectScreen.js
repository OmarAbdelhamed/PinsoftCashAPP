import React, { useEffect, useState } from 'react';
import api from '../../api';
import { createAxiosInterceptor } from '../../intercepter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setTargetId } from '../app/cashSlice';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const FriendSelectScreen = () => {
  const [selectedFriend, setSelectedFriend] = useState();
  const [FriendList, setFriendList] = useState();
  const [showFriendPicker, setShowFriendPicker] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTargetId(selectedFriend));
  }, [selectedFriend]);

  const token = useSelector((state) => state.cash.token);
  createAxiosInterceptor(api, token);

  useEffect(() => {
    api
      .get('/users/my-friends')

      .then(
        (response) => {
          const transformedData = response.data.map((user) => ({
            name: user.firstName,
            surname: user.lastName,
            id: user.id,
          }));
          setFriendList(transformedData);
          console.log('friends retreved');
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowFriendPicker(!showFriendPicker)}>
        <Text style={styles.buttonText}>Para göndermek için Arkadaş seç</Text>
      </TouchableOpacity>

      <FlatList
        data={FriendList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedFriend(item.id);
              navigation.navigate('SendMoneyScreen');
            }}
            style={styles.button}
          >
            <Text style={[styles.Text]}>
              {item.name} {item.surname}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 5,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    textAlign: 'center',
  },
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
  },
  spacing: {
    marginTop: 90,
  },
});

export default FriendSelectScreen;
