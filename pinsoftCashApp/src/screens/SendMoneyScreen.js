import { useState } from "react";
import { View, Text, TextInput , Button } from "react-native";
import { useDispatch } from "react-redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";

const SendMoneyScreen = () => {
  const [sentBalance, setSentBalance] = useState(null);
  const handleSubmit = (e)=>{

  }
  console.log(sentBalance);
  return (
    <View>
      <TextInput name='sent balance' value={sentBalance} onChangeText={(enteredValue)=>setSentBalance(enteredValue)} />
      <Button title="QR Oluştur" onPress={handleSubmit} />
    </View>
  );
};
export default SendMoneyScreen;
