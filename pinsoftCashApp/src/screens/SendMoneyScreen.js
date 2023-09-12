import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";


const SendMoneyScreen = ({ navigation }) => {
  const [sentBalance, setSentBalance] = useState("");
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(true); // İşlem başarısız olduğunda false olarak ayarlayın

  const handleSubmit = () => {
   
    setIsTransactionSuccessful(false);
    navigation.navigate("HataEkranı"); 
  };

  const handleQRCreate = () => {

    console.log("QR Kodu Oluşturuldu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Para Gönderme Ekranı</Text>
      <TextInput
        style={styles.input}
        name="sent balance"
        placeholder="Gönderilecek Tutar"
        value={sentBalance}
        onChangeText={(enteredValue) => setSentBalance(enteredValue)}
      />
      <Button title="Gönder" onPress={handleSubmit} />
      <Button title="QR Oluştur" onPress={handleQRCreate} /> {/* QR Oluştur düğmesi */}
      
      {isTransactionSuccessful === false}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default SendMoneyScreen;
