import React from "react";
import { View, Text, Button } from "react-native";

const SuccessScreen = ({ navigation }) => {
  
  const sentAmount = 100; 
  const remainingBalance = 900; 

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        İşlem Başarılı!
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Gönderilen Para: {sentAmount} TL
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 30 }}>
        Kalan Bakiye: {remainingBalance} TL
      </Text>
      <Button
        title="Ana Menü'ye Dön"
        onPress={() => {
          navigation.navigate("SendMoneyScreen");
        }}
      />
    </View>
  );
};

export default TransactionStatusScreen;
