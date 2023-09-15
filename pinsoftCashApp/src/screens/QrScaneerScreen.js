import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert(`QR Kod Okundu: ${data}`);
    if (data === "başarılı_kod") {
      navigation.navigate("TransactionSuccessScreen");
    } else {
      navigation.navigate("TransactionFailureScreen");
    }
  };

  
  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <Text style={styles.description}>QR Kodu Tara</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
});

export default QRScannerScreen;