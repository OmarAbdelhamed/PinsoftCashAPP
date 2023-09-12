import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ErrorScreen = ({ navigation }) => {
  const handleRetry = () => {
    // Tekrar Dene düğmesine basıldığında yapılacak işlemleri burada gerçekleştirin
    
  };

  const handleGoBack = () => {
    // AnaMenü Dön düğmesine basıldığında yapılacak işlemleri burada gerçekleştirin
    navigation.navigate("HomePage"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>İşlem Başarısız!</Text>
      <Button title="Tekrar Dene" onPress={handleRetry} />
      <Button title="Ana Menüye Dön" onPress={handleGoBack} />
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
});

export default ErrorScreen;
