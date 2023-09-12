import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionFailureScreen = ({ navigation }) => {
  const handleRetry = () => {

    navigation.navigate('QrScannerScreen');
  };

  const handleReturnToMainMenu = () => {
    
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İşlem Başarısız</Text>
      <Text style={styles.failureText}>İşlem başarısız oldu.</Text>
      <Text style={styles.icon}>❌</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Tekrar Dene</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReturnToMainMenu}>
          <Text style={styles.buttonText}>Ana Menüye Dön</Text>
        </TouchableOpacity>
      </View>
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
  failureText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff0000',
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

export default TransactionFailureScreen;
