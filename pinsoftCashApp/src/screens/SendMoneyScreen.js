import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import ErrorScreen from './ErrorScreen';
import api from '../../api';
import { useSelector } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';
import { useRoute } from '@react-navigation/native';
import { encode } from 'base-64'; // Import the 'encode' function

const SendMoneyScreen = ({ navigation }) => {
  const [sentBalance, setSentBalance] = useState('');
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(true);
  const [qrCodeImage, setQRCodeImage] = useState(null); // To store the QR code image as base64 data URI

  const token = useSelector((state) => state.cash.token);
  const userId = useSelector((state) => state.cash.userId);
  const targetId = useSelector((state) => state.cash.targetId);
  createAxiosInterceptor(api, token);

  const handleSubmit = () => {
    setIsTransactionSuccessful(false);
    navigation.navigate('ErrorScreen');
  };

  const handleQRCreate = () => {
    if (sentBalance.trim() === '') {
      alert('Enter the amount');
      return;
    }

    const requestData = {
      amount: parseFloat(sentBalance),
      senderUserId: userId,
      targetUserId: targetId,
    };

    api.post('/transfers', requestData, { responseType: 'arraybuffer' }).then(
      async (response) => {
        console.log(response.data);
        if (response) {
          console.log('success');
          
          const arrayBuffer = response.data;
          const uint8Array = new Uint8Array(arrayBuffer);

          const base64Data = encode(String.fromCharCode.apply(null, uint8Array));
          const dataURI = `data:image/png;base64,${base64Data}`;

          setQRCodeImage(dataURI);
        }
      },
      (error) => {
        alert(`${error.response.data}`);
        console.log(error.response.data);
      }
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Para Gönderme Ekranı</Text>
      <TextInput
        style={styles.input}
        name='sent balance'
        placeholder='Gönderilecek Tutar'
        value={sentBalance}
        onChangeText={(enteredValue) => setSentBalance(enteredValue)}
      />

      <Button title='QR Oluştur' onPress={handleQRCreate} />

      {qrCodeImage ? (
        // Display the received QR code image as a base64 data URI
        <Image source={{ uri: qrCodeImage }} style={styles.qrCodeImage} />
      ) : null}

      {isTransactionSuccessful === false && (
        <ErrorScreen navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
});

export default SendMoneyScreen;
