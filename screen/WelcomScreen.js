import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function WelcomeScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Lobby");
  }, 3000);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/welcome.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
