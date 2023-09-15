import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FriendsScreen from './FriendsScreen';
import axios from 'axios';
import api from '../../intercepter';
import { useDispatch } from 'react-redux';
import { setToken } from '../app/cashSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const handleLogin = () => {
  //   if (username === 'kullanici' && password === 'sifre') {
  //     setErrorMessage('');
  //     alert('Giriş başarılı!');
  //     navigation.navigate('HomePage');
  //   } else {
  //     setErrorMessage('Kullanıcı adı veya şifre hatalı.');
  //   }
  // };

  const handleLogin = () => {
    axios
      .post('https://mobil-bank-production.up.railway.app/auth/login', {
        email: username,
        password: password,
      })

      .then(
        (response) => {
          dispatch(setToken(response.data.token));
          console.log(response.data.token);

          if (response.data.token) {
            navigation.navigate('HomePage');
          }
        },

        (error) => {
          console.log(error);
          if (!username.trim()) {
            alert('Please enter email!');
          } else if (!password.trim()) {
            alert('Please enter password!');
          } else {
            alert('Make sure you entered the right parameters!');
          }
        }
      );
  };
  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        placeholder='Kullanıcı Adı'
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder='Şifre'
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonContainer}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonContainer}>Sign Up</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
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
    fontFamily: 'Cursive',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
export default LoginScreen;
