import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Material from "@expo/vector-icons/MaterialCommunityIcons";
export default function Lobby({ navigation }) {
  return (
    <LinearGradient colors={["#152155", "#3A6187"]} style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 150, height: 150, marginBottom: 50, marginTop: -50 }}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        HAND CRICKET
      </Text>
      <View>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Room")}
        >
          <LinearGradient
            colors={["#D4F1F8", "#71A6D1"]}
            style={{
              width: 180,
              height: 75,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image
              source={require("../assets/versus.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text
              style={{ color: "#3A6187", fontSize: 30, fontWeight: "bold" }}
            >
              Online
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{}} onPress={() => navigation.navigate("Bot")}>
          <LinearGradient
            colors={["#D4F1F8", "#71A6D1"]}
            style={{
              width: 180,
              height: 75,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image
              source={require("../assets/computer.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text
              style={{ color: "#3A6187", fontSize: 30, fontWeight: "bold" }}
            >
              Offline
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  online_btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 150,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#0fe1e1",
    marginTop: 30,
  },
});
