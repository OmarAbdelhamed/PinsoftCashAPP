import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';

const TransactionsScreen = () => {
  const [sendTransactions, setSendTransactions] = useState([]);

  const [ReceiveTransactions, setReceiveTransactions] = useState([]);
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
              name: `${data.targetUser.firstName} ${data.targetUser.lastName}`,
              amount: data.amount,
              date: data.createdDate,
              type: data.transferStatus,
            })
          );
          const transformedDataRecieve = response.data.takeMoneyTransfer.map(
            (data) => ({
              id: data.id,
              name: `${data.targetUser.firstName} ${data.targetUser.lastName}`,
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
    textAlign: 'center',
  },
  header2: {
    textAlign: 'center',
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
