import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { useNavigation } from "@react-navigation/native";
const QRScannerScreen = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`QR Kod Okundu: ${data}`);
    if (data === "başarılı_kod") {
      navigation.navigate("TransactionSuccessScreen");
    } else {
      navigation.navigate("TransactionFailureScreen");
    }
  };

  useEffect(() => {
    if (scanned) {
      // QR kod okunduğunda yapılacak işlemleri burada gerçekleştireceğiz
    }
  }, [scanned]);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      >
        <Text style={styles.description}>QR Kodu Tara</Text>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  description: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
});

export default QRScannerScreen;
