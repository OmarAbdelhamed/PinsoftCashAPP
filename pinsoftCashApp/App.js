import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Stacks from "./src/Stack/Stacks";
import { NavigationContainer } from "@react-navigation/native";
import {store} from './src/app/store'
import { Provider } from "react-redux";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
}
