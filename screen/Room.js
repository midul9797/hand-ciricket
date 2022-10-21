import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react-native";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref,
  onValue,
  child,
  get,
  push,
  update,
  onChildAdded,
  limitToLast,
} from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";
const firebaseConfig = {
  databaseURL:
    "https://hand-cricket-19747-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default function Room({ navigation }) {
  const [mainRoom, setMainRoom] = useState(null);
  const [userId, setUserId] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [role, setRole] = useState(null);
  const writeUserData = async (roomId) => {
    console.log(roomId);
    const postKey = push(ref(db, `users/${roomId}/`)).key;
    await set(ref(db, `users/${roomId}/${postKey}`), {
      run: 0,
    });
    console.log(postKey);
    setUserId(postKey);
    return postKey;
  };
  const generateRoom = async () => {
    const room = Math.floor(1000 + Math.random() * 9000);
    setMainRoom(room);
    console.log(room);
    const id = await writeUserData(room);

    navigation.navigate("WaitingLobby", { userId: id, room });
  };
  let opponentId;
  let text = null;
  const join = async () => {
    setMainRoom(inputText);
    const id = await writeUserData(inputText);
    navigation.navigate("WaitingLobby", { userId: id, room: inputText });
  };

  return (
    <LinearGradient
      // colors={["#4c00b0", "#7600bc"]}
      colors={["#152155", "#3A6187"]}
      style={styles.container}
    >
      <View>
        <TextInput
          style={styles.text_input}
          placeholder="Room ID"
          onChangeText={(newText) => setInputText(newText)}
          maxLength={4}
          keyboardType="numeric"
        />
        <TouchableOpacity style={{}} onPress={() => join()}>
          <LinearGradient
            colors={["#D4F1F8", "#71A6D1"]}
            style={{
              width: 180,
              height: 60,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text
              style={{ color: "#3A6187", fontSize: 30, fontWeight: "bold" }}
            >
              ENTER
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{}} onPress={() => generateRoom()}>
          <LinearGradient
            colors={["#D4F1F8", "#71A6D1"]}
            style={{
              width: 180,
              height: 60,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text
              style={{ color: "#3A6187", fontSize: 24, fontWeight: "bold" }}
            >
              Create Room
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
    backgroundColor: "#fcfc",
    alignItems: "center",
    justifyContent: "center",
  },
  text_input: {
    padding: 15,
    height: 60,
    width: 180,
    fontSize: 30,
    color: "white",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
  numbers: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    width: 65,
    height: 65,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  new: {
    width: 180,
    height: 60,
    margin: 10,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#152155",
  },
  text: {
    fontWeight: "800",
    fontSize: 24,
    color: "#027378",
  },
  out: {
    position: "absolute",
    zIndex: 100,
    fontSize: 50,
    fontWeight: "800",
    width: 200,
    height: 80,
    padding: 5,
    backgroundColor: "transparent",
    color: "red",
    textAlign: "center",
  },
});
