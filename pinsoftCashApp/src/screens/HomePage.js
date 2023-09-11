import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const HomePage = () => {
  const [balance, setBalance] = useState(1000.0);
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [transactionType, setTransactionType] = useState('send');
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [showLastTransactions, setShowLastTransactions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSendMoney = () => {
    if (recipient && amount > 0 && balance >= amount) {
      setBalance(balance - parseFloat(amount));

      const newTransaction = {
        type: 'Gönderildi',
        recipient: recipient,
        amount: parseFloat(amount),
      };
      setTransactions([newTransaction, ...transactions]);

      setRecipient('');
      setAmount('');
    }
  };

  const handleReceiveMoney = () => {
    if (amount > 0) {
      setBalance(balance + parseFloat(amount));

      const newTransaction = {
        type: 'Alındı',
        sender: 'Gönderen Kişi',
        amount: parseFloat(amount),
        timestamp: new Date().getTime(),
      };
      setTransactions([newTransaction, ...transactions]);

      setAmount('');
    }
  };
  const friends = [
    { id: 1, name: 'Arkadaş 1', surname: 'Soyadı 1' },
    { id: 2, name: 'Arkadaş 2', surname: 'Soyadı 2' },
    { id: 3, name: 'Arkadaş 3', surname: 'Soyadı 3' },
  ];

  const getLastTransaction = () => {
    if (transactionType === 'send') {
      const lastSendTransaction = transactions.find((transaction) => transaction.type === 'Gönderildi');
      return lastSendTransaction;
    } else {
      const lastReceiveTransaction = transactions.find((transaction) => transaction.type === 'Alındı');
      return lastReceiveTransaction;
    }
  };

  const getLastFiveFriends = () => {
    const friendsWithLastTransaction = friends.map((friend) => {
      const lastTransaction = transactions.find((transaction) => transaction.recipient === friend.name);
      return {
        ...friend,
        lastTransaction: lastTransaction || { amount: 0, timestamp: 0 },
      };
    });

    return friendsWithLastTransaction
      .sort((a, b) => a.lastTransaction.timestamp - b.lastTransaction.timestamp)
      .slice(0, 5);
  };

  const getLastFiveTransactions = () => {
    return transactions.slice(0, 5);
  };

  return (
    <View>
      <Text style={[styles.balanceText, styles.spacing,]}>Güncel Bakiyeniz</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{balance.toFixed(2)} TL</Text>
      </View>

      <TouchableOpacity onPress={() => setShowLastTransactions(!showLastTransactions)}>
        <Text style={[styles.buttonText, styles.spacing]}>En Son İşlem Yapan Arkadaşlar:</Text>
      </TouchableOpacity>

      {showLastTransactions && (
        <FlatList
          data={getLastFiveFriends()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedTransaction(item.lastTransaction)}>
              <Text style={[styles.buttonText]}>
                {item.name} {item.surname}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMoney}>
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.receiveButton}
            onPress={handleReceiveMoney}>
            <Text style={styles.buttonText}>Al</Text>
          </TouchableOpacity>
        </View>

      {/* {selectedTransaction && (
        <View>
          <Text style={[styles.buttonText, styles.spacing]}>Seçilen İşlem Detayları:</Text>
          <Text style={[styles.buttonText]}>Tür: {selectedTransaction.type}</Text>
          <Text style={[styles.buttonText]}>Miktar: {selectedTransaction.amount.toFixed(2)} TL</Text>
          <Text style={[styles.buttonText]}>Tarih: {new Date(selectedTransaction.timestamp).toLocaleString()}</Text>
        </View>
      )} */}

      <TouchableOpacity onPress={() => setShowTransactionHistory(!showTransactionHistory)}>
        <Text style={[styles.buttonText]}>En Son İşlemler:</Text>
      </TouchableOpacity>

      {showTransactionHistory && (
        <FlatList
        data={getLastFiveFriends()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedTransaction(item.lastTransaction)}>
            <Text style={[styles.buttonText]}>
              {item.name} {item.surname} - {item.lastTransaction.amount.toFixed(2)} TL - {new Date(item.lastTransaction.timestamp).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
      />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing: {
    marginTop: 90,
  },
  balanceContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    borderRadius: 5,
    width: '250px',
    alignSelf: 'center',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Cursive',
    margin: 'auto',
  },
  transactionHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  sendButton: {
    flex: 1,
    backgroundColor: 'white', 
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiveButton: {
    flex: 1,
    backgroundColor: 'white', 
    marginHorizontal: 5,
    borderWidth: 1, 
    borderColor: 'gray',
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cursive', 
    textAlign: 'left',
    padding: 5,
  },
});

export default HomePage;