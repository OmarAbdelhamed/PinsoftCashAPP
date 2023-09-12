import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FriendsScreen = () => {
  const [friends, setFriends] = useState([
    { id: 1, fullName: 'Arkadaş 1' },
    { id: 2, fullName: 'Arkadaş 2' },
    { id: 3, fullName: 'Arkadaş 3' },
  ]);

  const navigation = useNavigation();

  // Arkadaş ekle sayfasına yönlendirme işlevi
  const navigateToAddFriend = () => {
    navigation.navigate('AddFriendScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arkadaşlarım</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendListItem}>
            <Text style={styles.friendText}>{item.fullName}</Text>
          </View>
        )}
      />
      <Button style={styles.button} title="Arkadaş Ekle" onPress={navigateToAddFriend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Cursive',
    margin: 'auto',
    marginTop: 90,
  },
  friendListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  friendText: {
    fontSize: 18,
    fontFamily: 'Cursive',
    margin: 'auto',
  },
  button: {
    marginTop: 1,
    backgroundColor: 'orange',
    fontSize: 20,
  },
});

export default FriendsScreen;