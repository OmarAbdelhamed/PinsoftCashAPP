import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import api from '../../api';
import { useSelector } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const token = useSelector((state) => state.cash.token);
  createAxiosInterceptor(api, token);

  const handleBarCodeScanned = ({ data }) => {
    const parsedData = JSON.parse(data);

    const requestData = {
      id: parsedData.id,
      amount: parsedData.amount,
      senderUserId: parsedData.senderUserId,
      targetUserId: parsedData.targetUserId,
    };
    console.log(parsedData);
    setScanned(true);
    api
      .post('/transfers/read', requestData)

      .then(
        (response) => {
          console.log(response.data);
          Alert.alert(`QR Kod Okundu: ${data}`);
          navigation.navigate('TransactionSuccessScreen', {
            amount: parsedData.amount,
            senderUserId: parsedData.senderUserId,
          });
        },

        (error) => {
          console.log(error);
          navigation.navigate('TransactionFailureScreen');
        }
      );

    Alert.alert(`QR Kod Okundu: ${data}`);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <Text style={styles.description}>QR Kodu Tara</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
});

export default QRScannerScreen;
