import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from "./screen/SplashScreen";
import Nav from "./navigation/navbar"


export default function App() {
  return (
    <View style={styles.container}>
      <Nav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
