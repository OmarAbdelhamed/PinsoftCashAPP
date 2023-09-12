import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import TransactionsScreen from './TransactionsScreen'; // TransactionsScreen dosyasının yolunu belirtin

class LoginScreen extends Component {
  // ... Diğer kodlar ...

  handleLogin = () => {
    // Kullanıcı giriş yaptığında TransactionsScreen sayfasına yönlendirin
    this.props.navigation.navigate('TransactionsScreen'); // 'TransactionsScreen' sayfasının adını kullanın
  };

  render() {
    return (
      <View>
        {/* ... Diğer bileşenler */}
        <Button title="Giriş Yap" onPress={this.handleLogin} />
      </View>
    );
  }
}

export default LoginScreen;
