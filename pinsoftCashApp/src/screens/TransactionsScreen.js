import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Örnek işlem verileri
const transactions = [
  { id: 1, name: 'Mahir U', amount: -50.0, date: '2023-09-10', type: 'Para Gönderildi' },
  { id: 2, name: 'Yusuf', amount: 2000.0, date: '2023-09-09',type: 'Para Alındı' },
  { id: 3, name: 'Ebrar', amount: -150.0, date: '2023-09-08',type: 'Para Gönderildi' },
  
];


// İşlemleri tarihe göre sırala (en yeni tarih en üstte olacak)
transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

class TransactionsScreen extends Component {
  renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.name}</Text>
      <Text>{item.amount} TL</Text>
      <Text>Tarih: {item.date}</Text>
    </View>
  ); renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.name}, Miktar: {Math.abs(item.amount)} TL Tarih: {item.date} </Text>
      <Text>{item.amount > 0 ? 'Para Alındı' : 'Para Gönderildi'}</Text>
      {/* <Text>Miktar: {Math.abs(item.amount)} TL</Text> */}
      {/* <Text>Tarih: {item.date}</Text> */}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tüm İşlemler</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderTransaction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
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
