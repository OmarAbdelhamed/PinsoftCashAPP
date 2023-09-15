import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { createAxiosInterceptor } from '../../intercepter';
import { setUserId, setTargetId } from '../app/cashSlice';

const HomePage = () => {
  const [balance, setBalance] = useState(1000.0);
  const [userId, setId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [FriendList, setFriendList] = useState();
  const [transactionType, setTransactionType] = useState('send');
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [sendTransactions, setSendTransactions] = useState([]);
  const [ReceiveTransactions, setReceiveTransactions] = useState([]);
  const [showLastTransactions, setShowLastTransactions] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSendMoney = () => {
    navigation.navigate('FriendSelectScreen', { setBalance: 'setBalance' });
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

  const token = useSelector((state) => state.cash.token);
  createAxiosInterceptor(api, token);
  useEffect(() => {
    api
      .get('/users')

      .then(
        (response) => {
          console.log(response.data);
          dispatch(setUserId(response.data.id));
          setId(response.data.id);
          setBalance(response.data.amount);
        },

        (error) => {
          console.log(error);
        }
      );
  },[]);

  useEffect(() => {
    api
      .get('/users/my-friends')

      .then(
        (response) => {
          const transformedData = response.data.map((user) => ({
            name: user.firstName,
            surname: user.lastName,
            id: user.id,
          }));
          setFriendList(transformedData);
          console.log('friends retreved');
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    api
      .get('/transfers/my-transfers')

      .then(
        (response) => {
          console.log(response.data);
          const transformedDataSend = response.data.sendMoneyTransfer.map(
            (data) => ({
              id: data.id,
              sender: data.targetUser.firstName,
              amount: data.amount,
              timestamp: data.createdDate,
              type: data.transferStatus,
            })
          );
          const transformedDataRecieve = response.data.takeMoneyTransfer.map(
            (data) => ({
              id: data.id,
              sender: data.targetUser.firstName,
              amount: data.amount,
              timestamp: data.createdDate,
              type: data.transferStatus,
            })
          );
          setSendTransactions(transformedDataSend);
          setReceiveTransactions(transformedDataRecieve);
          setTransactions([...sendTransactions, ...ReceiveTransactions]);
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handleReceiveMoney = () => {
    navigation.navigate('QRScannerScreen');
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

  const getLastTransaction = () => {
    if (transactionType === 'send') {
      const lastSendTransaction = transactions.find(
        (transaction) => transaction.type === 'Gönderildi'
      );
      return lastSendTransaction;
    } else {
      const lastReceiveTransaction = transactions.find(
        (transaction) => transaction.type === 'Alındı'
      );
      return lastReceiveTransaction;
    }
  };

  const getLastFiveFriends = () => {
    const friendsWithLastTransaction = FriendList.map((friend) => {
      const lastTransaction = transactions.find(
        (transaction) => transaction.recipient === friend.name
      );
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
      <Text style={[styles.balanceText, styles.spacing]}>Güncel Bakiyeniz</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{balance.toFixed(2)} TL</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowLastTransactions(!showLastTransactions)}
      >
        <Text style={[styles.buttonText, styles.spacing]}>
          en son işlem yapan Arkadaşlarım:
        </Text>
      </TouchableOpacity>

      {showLastTransactions && (
        <FlatList
          data={getLastFiveFriends()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={[styles.buttonText]}>
                {item.name} {item.surname}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
          <Text style={styles.buttonText}>Gönder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.receiveButton}
          onPress={handleReceiveMoney}
        >
          <Text style={styles.buttonText}>Al</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          setShowTransactionHistory(!showTransactionHistory);
        }}
      >
        <Text style={[styles.buttonText]}>En Son İşlemler:</Text>
      </TouchableOpacity>

      {showTransactionHistory && (
        <FlatList
          data={getLastFiveTransactions()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTransaction(item.lastTransaction)}
            >
              <Text style={[styles.buttonText]}>
                {item.name} {item.surname} -{' '}
                {item.lastTransaction.amount.toFixed(2)} TL -{' '}
                {new Date(item.lastTransaction.timestamp).toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )} */}
      <TouchableOpacity
        onPress={() => navigation.navigate('TransactionsScreen')}
      >
        <Text style={[styles.buttonText]}>Tum işlemler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FriendsScreen')}>
        <Text style={[styles.buttonText]}>Tum arkadaslar</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddFriendScreen');
        }}
      >
        <Text style={[styles.buttonText]}>Add a friend</Text>
      </TouchableOpacity> */}
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
