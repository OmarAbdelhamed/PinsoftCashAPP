import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    axios
      .post('https://mobil-bank-production.up.railway.app/auth/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })

      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            alert('Üyelik başarıyla oluşturuldu!');
            navigation.navigate('LoginScreen');
          }
        },
        (error) => {
          alert('hata oldu!');
          console.log(error);
        }
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Üyelik Oluştur</Text>
      <TextInput
        placeholder='Ad'
        style={styles.input}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        placeholder='Soyad'
        style={styles.input}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <TextInput
        placeholder='E-posta'
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Şifre'
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title='Üyelik Oluştur' onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
