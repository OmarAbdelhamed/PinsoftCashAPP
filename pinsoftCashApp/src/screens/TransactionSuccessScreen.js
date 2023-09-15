import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../api';
import { useSelector } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';

const TransactionSuccessScreen = () => {
  const token = useSelector((state) => state.cash.token);
  createAxiosInterceptor(api, token);
  const navigation = useNavigation();
  const [transactionData, setTransactionData] = useState({
    receivedAmount: 0,
    senderName: '',
    currentBalance: 0,
  });
  const route = useRoute();

  useEffect(() => {
    api
      .get(`/users/${route.params.senderUserId}`)

      .then(
        (response) => {
          console.log(response.data);
          const transformedData = response.data.map((user) => ({
            receivedAmount: route.params.amount,
            senderName: user.firstName,
            id: user.id,
          }));
          setFriendList(transformedData);
        },

        (error) => {
          console.log(error);
        }
      );
    
  }, []);

  const handleReturnToMainMenu = () => {
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İşlem Başarılı</Text>
      <Text style={styles.successText}>İşlem başarıyla tamamlandı.</Text>
      <Text style={styles.icon}>✅</Text>
      <View style={styles.transactionDetails}>
        <Text style={styles.detailText}>
          Hesaba Gelen Para: {transactionData.receivedAmount.toFixed(2)}
        </Text>
        <Text style={styles.detailText}>
          Gönderen: {transactionData.senderName}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleReturnToMainMenu}>
        <Text style={styles.buttonText}>Ana Menüye Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    marginVertical: 10,
  },
  transactionDetails: {
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransactionSuccessScreen;
