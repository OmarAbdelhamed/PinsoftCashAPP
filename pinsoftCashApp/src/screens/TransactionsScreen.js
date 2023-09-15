import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';

const TransactionsScreen = () => {
  const [sendTransactions, setSendTransactions] = useState([
    {
      id: 1,
      name: 'Mahir U',
      amount: -50.0,
      date: '2023-09-10',
      type: 'Para Gönderildi',
    },
    {
      id: 2,
      name: 'Yusuf',
      amount: 2000.0,
      date: '2023-09-09',
      type: 'Para Alındı',
    },
    {
      id: 3,
      name: 'Ebrar',
      amount: -150.0,
      date: '2023-09-08',
      type: 'Para Gönderildi',
    },
  ]);

  const [ReceiveTransactions, setReceiveTransactions] = useState([
    {
      id: 1,
      name: 'Mahir U',
      amount: -50.0,
      date: '2023-09-10',
      type: 'Para Gönderildi',
    },
    {
      id: 2,
      name: 'Yusuf',
      amount: 2000.0,
      date: '2023-09-09',
      type: 'Para Alındı',
    },
    {
      id: 3,
      name: 'Ebrar',
      amount: -150.0,
      date: '2023-09-08',
      type: 'Para Gönderildi',
    },
  ]);
  const token = useSelector((state) => state.cash.token);
  createAxiosInterceptor(api, token);

  useEffect(() => {
    api
      .get('/transfers/my-transfers')

      .then(
        (response) => {
          console.log(response.data);
          const transformedDataSend = response.data.sendMoneyTransfer.map(
            (data) => ({
              id: data.id,
              name: data.targetUser.firstName,
              amount: data.amount,
              date: data.createdDate,
              type: data.transferStatus,
            })
          );
          const transformedDataRecieve = response.data.takeMoneyTransfer.map(
            (data) => ({
              id: data.id,
              name: data.targetUser.firstName,
              amount: data.amount,
              date: data.createdDate,
              type: data.transferStatus,
            })
          );
          setSendTransactions(transformedDataSend);
          setReceiveTransactions(transformedDataRecieve);
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>
        {item.name}, Miktar: {Math.abs(item.amount)} TL Tarih: {item.date}{' '}
      </Text>
      <Text>{item.amount > 0 ? 'Para Alındı' : 'Para Gönderildi'}</Text>
      {/* <Text>Miktar: {Math.abs(item.amount)} TL</Text> */}
      {/* <Text>Tarih: {item.date}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tüm İşlemler</Text>
      <Text style={styles.header2}>send Transactions</Text>
      <FlatList
        data={sendTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
      />
      <Text style={styles.header2}>Receive Transactions</Text>
      <FlatList
        data={ReceiveTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
  },
  header2: {
    textAlign:'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'column',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    padding: 16,
  },
});

export default TransactionsScreen;
