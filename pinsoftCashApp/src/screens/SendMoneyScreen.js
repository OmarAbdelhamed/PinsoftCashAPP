import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ErrorScreen from './ErrorScreen';
import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';

import QRCode from 'react-native-qrcode-svg';

const SendMoneyScreen = ({ navigation }) => {
  const [sentBalance, setSentBalance] = useState('');
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(true); // İşlem başarısız olduğunda false olarak ayarlayın
  const [qrData, setQRData] = useState(''); // QR kodunun içeriğini tutmak için bir state ekleyin

  const token = useSelector((state) => state.cash.token);
  const userId = useSelector((state) => state.cash.userId);
  const targetId = useSelector((state) => state.cash.targetId);
  createAxiosInterceptor(api, token);

  const handleSubmit = () => {
    setIsTransactionSuccessful(false);
    navigation.navigate('ErrorScreen');
  };

  const handleQRCreate = () => {
    api
      .get('/transfers', {
        amount: sentBalance,
        senderUserId: userId,
        targetUserId: targetId,
      })

      .then(
        (response) => {
          console.log(response);
          if (response) {
            console.log('sent successfully');
          }
        },

        (error) => {
          console.log(error);
        }
      );
    setQRData(sentBalance);
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
      <Button title='Gönder' onPress={handleSubmit} />

      <Button title='QR Oluştur' onPress={handleQRCreate} />

      {/* QR kodunu sadece bir şartla görüntüleyin */}
      {qrData ? (
        <QRCode
          value={qrData} // QR kodunun içeriği
          size={200}
        />
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
});

export default SendMoneyScreen;
