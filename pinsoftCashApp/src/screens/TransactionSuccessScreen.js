import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionSuccessScreen = () => {
  const [transactionData, setTransactionData] = useState({
    receivedAmount: 0,
    senderName: '',
    currentBalance: 0,
  });

  
  const fetchTransactionData = async () => {
    try {
      // Verileri API'den çekmek için işlem
      
      const data = {
        receivedAmount: 500.0,
        senderName: 'John Doe',
        currentBalance: 1200.0,
      };

      setTransactionData(data);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde verileri çek
    fetchTransactionData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İşlem Başarılı</Text>
      <Text style={styles.successText}>İşlem başarıyla tamamlandı.</Text>
      <Text style={styles.icon}>✅</Text>
      <View style={styles.transactionDetails}>
        <Text style={styles.detailText}>
          Hesaba Gelen Para: ${transactionData.receivedAmount.toFixed(2)}
        </Text>
        <Text style={styles.detailText}>Gönderen: {transactionData.senderName}</Text>
        <Text style={styles.detailText}>
          Güncel Bakiye: ${transactionData.currentBalance.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ana Menüye Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Stil tanımlamaları 
});

export default TransactionSuccessScreen;
